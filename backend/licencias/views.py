import json
import uuid
import re
from pathlib import Path
from datetime import datetime, timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from licencias.users import authenticate_user
from .jwt_auth import generate_token
from .roles import IsMedico, IsAdmin, IsAdminOrOwner
from licencias.serializers import PacienteSerializer #valudaciones

class LoginView(APIView):

    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):

        email = request.data.get("email", "")
        password = request.data.get("password", "")

        if not isinstance(email, str) or not isinstance(password, str):
            return Response(
                {"error": "Credenciales inválidas."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        user = authenticate_user(email, password)

        if not user:
            return Response(
                {"error": "Correo o contraseña incorrectos."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        token = generate_token(user)

        return Response({
            "access": token,
            "token_type": "Bearer",
            "expires_in": 7200,
            "user": {
                "id": user["id"],
                "email": user["email"],
                "role": user["role"],
                "nombre": user["nombre"],
            },
        })

class LicenseListView(APIView):

    permission_classes = [IsAdmin | IsMedico]

    def get(self, request):

        file_path = Path(__file__).resolve().parent.parent / "data" / "licencias.json"

        try:
            with open(file_path, "r", encoding="utf-8") as file:
                licencias = json.load(file)

        except FileNotFoundError:
            licencias = []

        if request.user.role == "medico":
            licencias = [
                licencia for licencia in licencias
                if licencia.get("medicoId") == request.user.id
            ]

        return Response(licencias)

class LicenseDetailView(APIView):

    permission_classes = [IsAdmin | IsMedico, IsAdminOrOwner]

    def get(self, request, pk):

        file_path = Path(__file__).resolve().parent.parent / "data" / "licencias.json"

        try:
            with open(file_path, "r", encoding="utf-8") as file:
                licencias = json.load(file)

        except FileNotFoundError:
            licencias = []

        licencia = next(
            (item for item in licencias if item.get("id") == pk),
            None
        )

        if licencia is None:
            return Response(
                {"error": "Licencia no encontrada."},
                status=404
            )

        self.check_object_permissions(request, licencia)

        return Response(licencia)

class LicenseCreateView(APIView):

    permission_classes = [IsMedico]

    def post(self, request):

        data = request.data

        paciente_serializer = PacienteSerializer(data=request.data.get("paciente", {}))

        if not paciente_serializer.is_valid():
            return Response(
                {"paciente": paciente_serializer.errors},
                status=status.HTTP_422_UNPROCESSABLE_ENTITY
            )

        paciente = paciente_serializer.validated_data
        paciente["fechaNacimiento"] = paciente["fechaNacimiento"].isoformat()

        file_path = Path(__file__).resolve().parent.parent / "data" / "licencias.json"

        try:
            with open(file_path, "r", encoding="utf-8") as file:
                licencias = json.load(file)

        except FileNotFoundError:
            licencias = []

        nueva_licencia = {
            "id": str(uuid.uuid4()),
            "folio": f"LME-{datetime.now().year}-{len(licencias) + 1:06d}",
            "fechaEmision": datetime.now(timezone.utc).isoformat(),
            "medicoId": request.user.id,
            "paciente": paciente, #data.get("paciente", {}),
            "licencia": data.get("licencia", {}),
        }

        licencias.append(nueva_licencia)

        with open(file_path, "w", encoding="utf-8") as file:
            json.dump(licencias, file, ensure_ascii=False, indent=4)

        return Response(
            nueva_licencia,
            status=status.HTTP_201_CREATED
        )