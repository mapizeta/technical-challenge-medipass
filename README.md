# Desafío Técnico – Licencias Médicas Electrónicas

MVP para la emisión y consulta de licencias médicas electrónicas.

## Tecnologías

**Backend**
- Python
- Django REST Framework
- JWT
- Persistencia mediante archivo JSON

**Frontend**
- React
- TypeScript
- Vite
- Bootstrap 5

## Requisitos

- Python 3.12 o superior
- uv
- Node.js y npm

## Ejecución del proyecto

### Backend

Desde la raíz del repositorio:

```bash
cd backend
uv sync
uv run python manage.py migrate
uv run python manage.py runserver
```

Backend disponible en:

`http://127.0.0.1:8000`

### Frontend

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend disponible en:

`http://localhost:5173`

## Usuarios de prueba

| Rol | Usuario | Contraseña |
|---|---|---|
| Administrador | admin@clinica.cl | admin123 |
| Médico | dra.soto@clinica.cl | medico123 |
| Médico | dr.rojas@clinica.cl | medico123 |

## API

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/api/login` | Autenticación |
| GET | `/api/licencias` | Listado de licencias |
| GET | `/api/licencia/{id}` | Detalle de licencia |
| POST | `/api/licencia` | Emisión de licencia |

## Persistencia

Los registros se almacenan en `backend/data/licencias.json`.

La autenticación utiliza tokens JWT y los permisos dependen del rol del usuario.

## Uso de inteligencia artificial

Se incluye el archivo `ai_interactions.md` con información sobre el uso de herramientas de IA durante el desarrollo.