
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar bg-white border-bottom px-4">
      <div className="container-fluid justify-content-between">

        <span className="navbar-brand mb-0 h6">
          Gestión de Licencias Médicas
        </span>

        <div className="d-flex align-items-center gap-3">
          <div className="text-end">
            <div className="fw-semibold">
              {user?.nombre}
            </div>
            <small className="text-secondary">
              {user?.role === 'admin' ? 'Administrador' : 'Médico'}
            </small>
          </div>

          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>

      </div>
    </nav>
  )
}
