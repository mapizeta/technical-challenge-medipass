from rest_framework.permissions import BasePermission


class IsAdmin(BasePermission):
    """
    Permite el acceso exclusivamente a usuarios administradores.
    """

    message = "Se requieren permisos de administrador."

    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and request.user.role == "admin"
        )


class IsMedico(BasePermission):
    """
    Permite el acceso exclusivamente a usuarios médicos.
    """

    message = "Se requieren permisos de médico."

    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and request.user.role == "medico"
        )


class IsAdminOrOwner(BasePermission):
    """
    Permite al administrador acceder a cualquier licencia.
    El médico solamente puede acceder a sus propias licencias.
    """

    message = "No tienes permisos para acceder a esta licencia."

    def has_permission(self, request, view):
        return (
            request.user
            and request.user.is_authenticated
            and request.user.role in ("admin", "medico")
        )

    def has_object_permission(self, request, view, obj):
        if request.user.role == "admin":
            return True

        return obj.get("medicoId") == request.user.id