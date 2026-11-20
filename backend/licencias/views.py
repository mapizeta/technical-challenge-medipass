from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status
from licencias.users import authenticate_user
from .jwt_auth import generate_token

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