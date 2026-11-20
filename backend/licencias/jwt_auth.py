import jwt

from datetime import datetime, timedelta, timezone
from types import SimpleNamespace

from django.conf import settings
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed

JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_HOURS = 2


def generate_token(user):
    now = datetime.now(timezone.utc)

    payload = {
        "sub": str(user["id"]),
        "role": user["role"],
        "iat": now,
        "exp": now + timedelta(hours=JWT_EXPIRATION_HOURS),
    }

    if user["role"] == "medico":
        payload["rut"] = user["rut"]
        payload["nombre"] = user["nombre"]

    return jwt.encode(
        payload,
        settings.SECRET_KEY,
        algorithm=JWT_ALGORITHM,
    )


class JWTAuthentication(BaseAuthentication):

    def authenticate(self, request):
        auth_header = request.headers.get("Authorization")

        if not auth_header:
            return None

        parts = auth_header.split()

        if len(parts) != 2 or parts[0].lower() != "bearer":
            raise AuthenticationFailed("Formato de token inválido.")

        token = parts[1]

        try:
            payload = jwt.decode(
                token,
                settings.SECRET_KEY,
                algorithms=[JWT_ALGORITHM],
            )

            user_id = int(payload["sub"])
            role = payload["role"]

            if role not in ("admin", "medico"):
                raise AuthenticationFailed("Rol inválido.")

            if role == "medico" and not all(
                payload.get(field) for field in ("rut", "nombre")
            ):
                raise AuthenticationFailed("Claims del médico incompletos.")

            user = SimpleNamespace(
                id=user_id,
                role=role,
                rut=payload.get("rut"),
                nombre=payload.get("nombre"),
                is_authenticated=True,
            )

            return user, payload

        except jwt.InvalidTokenError:
            raise AuthenticationFailed("Token inválido o expirado.")

        except (KeyError, TypeError, ValueError):
            raise AuthenticationFailed("Token con estructura inválida.")

    def authenticate_header(self, request):
        return "Bearer"