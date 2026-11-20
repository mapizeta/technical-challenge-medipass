
export default function Dashboard() {
  return (
    <div>
      <div className="mb-4">
        <h4 className="fw-bold">Dashboard</h4>
        <p className="text-secondary mb-0">
          Resumen general de licencias médicas.
        </p>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-secondary">Licencias emitidas</h6>
              <h3 className="fw-bold mb-0">—</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-secondary">Licencias pendientes</h6>
              <h3 className="fw-bold mb-0">—</h3>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h6 className="text-secondary">Actividad reciente</h6>
              <h3 className="fw-bold mb-0">—</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body py-5 text-center">
          <h5>No hay información disponible</h5>
          <p className="text-secondary mb-0">
            Los registros aparecerán aquí cuando estén disponibles.
          </p>
        </div>
      </div>
    </div>
  )
}
