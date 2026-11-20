
export default function Navbar() {
  return (
    <nav className="navbar bg-white border-bottom px-4">
      <div className="container-fluid justify-content-between">

        <span className="navbar-brand mb-0 h6">
          Gestión de Licencias Médicas
        </span>

        <div className="d-flex align-items-center gap-3">
          <div className="text-end">
            <div className="fw-semibold">
              Dra. Carolina Soto
            </div>
            <small className="text-secondary">
              Médico
            </small>
          </div>

          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
          >
            Cerrar sesión
          </button>
        </div>

      </div>
    </nav>
  )
}
