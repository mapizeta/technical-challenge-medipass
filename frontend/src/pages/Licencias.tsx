
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getLicencias, type Licencia } from '../services/licencias'

export default function Licencias() {
  const { user } = useAuth()
  const isAdmin = user?.role === 'admin'

  const [licencias, setLicencias] = useState<Licencia[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function cargarLicencias() {
      try {
        setLoading(true)
        setError('')

        const data = await getLicencias()
        setLicencias(data)
      } catch {
          console.error('Error al cargar licencias:', error)
          setError('No fue posible cargar las licencias médicas.')
      } finally {
        setLoading(false)
      }
    }

    cargarLicencias()
  }, [])

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Licencias médicas</h4>
          <p className="text-secondary mb-0">
            Consulta y gestión de licencias médicas electrónicas.
          </p>
        </div>

        {!isAdmin && (
          <Link to="/licencias/nueva" className="btn btn-primary">
            Nueva licencia
          </Link>
        )}
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <input
                type="search"
                className="form-control"
                placeholder="Buscar por folio o paciente..."
                disabled
              />
            </div>

            <div className="col-md-3">
              <select className="form-select" disabled>
                <option>Todos los registros</option>
              </select>
            </div>
          </div>

          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
              <p className="text-secondary mt-2 mb-0">
                Cargando licencias...
              </p>
            </div>
          )}

          {!loading && error && (
            <div className="alert alert-danger mb-0">
              {error}
            </div>
          )}

          {!loading && !error && licencias.length === 0 && (
            <div className="text-center py-5">
              <h6 className="fw-semibold">
                No hay licencias registradas
              </h6>
              <p className="text-secondary mb-0">
                Cuando existan licencias, aparecerán en este listado.
              </p>
            </div>
          )}

          {!loading && !error && licencias.length > 0 && (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Folio</th>
                    <th>Paciente</th>
                    <th>Fecha de emisión</th>
                    {isAdmin && <th>Médico</th>}
                    <th>Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {licencias.map((licencia) => (
                    <tr key={licencia.id}>
                      <td className="fw-semibold">
                        {licencia.folio}
                      </td>

                      <td>
                        <div>{licencia.paciente.nombres} {licencia.paciente.apellidos}</div>
                        <small className="text-secondary">
                          {licencia.paciente.rut}
                        </small>
                      </td>

                      <td>
                        {new Date(licencia.fechaEmision).toLocaleDateString('es-CL')}
                      </td>

                      {isAdmin && (
                        <td>Médico #{licencia.medicoId}</td>
                      )}

                      <td>
                        <Link
                          to={`/licencias/${licencia.id}`}
                          className="btn btn-sm btn-outline-primary"
                        >
                          Ver detalle
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}