
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link px-3 py-2 rounded ${
      isActive ? 'active bg-primary text-white' : 'text-dark'
    }`

  return (
    <aside
      className="sidebar bg-white border-end p-3"
      style={{ width: '250px', minWidth: '250px' }}
    >
      <div className="mb-4 px-2">
        <h5 className="fw-bold mb-1">Medipass</h5>
        <small className="text-secondary">
          Licencias médicas
        </small>
      </div>

      <div className="text-uppercase text-secondary small fw-semibold mb-2 px-2">
        Menú principal
      </div>

      <nav className="nav nav-pills flex-column gap-1">
        <NavLink to="/dashboard" className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/licencias" className={linkClass}>
          Licencias médicas
        </NavLink>

        <NavLink to="/licencias/nueva" className={linkClass}>
          Nueva licencia
        </NavLink>
      </nav>
    </aside>
  )
}
