
export default function Login() {
  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="row justify-content-center w-100">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4 p-md-5">

              <div className="text-center mb-4">
                <h2 className="mb-2">Licencias Médicas</h2>
                <p className="text-muted mb-0">
                  Sistema de gestión de licencias médicas
                </p>
              </div>

              <form>
                <div className="mb-3">
                  <label className="form-label">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="usuario@clinica.cl"
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Ingresa tu contraseña"
                  />
                </div>

                <button
                  type="button"
                  className="btn btn-primary w-100"
                >
                  Iniciar sesión
                </button>
              </form>

            </div>
          </div>

          <p className="text-center text-muted small mt-4">
            Sistema de Gestión de Licencias Médicas
          </p>
        </div>
      </div>
    </div>
  )
}
