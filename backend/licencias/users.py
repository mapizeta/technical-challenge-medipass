USERS = {
    "admin@clinica.cl": {
        "id": 1,
        "email": "admin@clinica.cl",
        "password": "admin123",
        "role": "admin",
        "nombre": "Administrador",
    },
    "dra.soto@clinica.cl": {
        "id": 2,
        "email": "dra.soto@clinica.cl",
        "password": "medico123",
        "role": "medico",
        "rut": "12.345.678-5",
        "nombre": "Dra. Carolina Soto",
    },
    "dr.rojas@clinica.cl": {
        "id": 3,
        "email": "dr.rojas@clinica.cl",
        "password": "medico123",
        "role": "medico",
        "rut": "11.111.111-1",
        "nombre": "Dr. Andrés Rojas",
    },
}


def authenticate_user(email, password):
    user = USERS.get(email.lower().strip())

    if not user or user["password"] != password:
        return None

    return user