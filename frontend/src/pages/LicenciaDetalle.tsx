
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getLicencia, type Licencia } from '../services/licencias'

export default function LicenciaDetalle() {
  const { id } = useParams<{ id: string }>()

  const [licencia, setLicencia] = useState<Licencia | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function cargarLicencia() {
      if (!id) {
        setError('Identificador de licencia inválido.')
        setLoading(false)
        return
      }

      try {
        const data = await getLicencia(id)
        setLicencia(data)
      } catch (err: any) {
        if (err.response?.status === 403) {
          setError('No tienes permisos para consultar esta licencia.')
        } else if (err.response?.status === 404) {
          setError('La licencia solicitada no existe.')
        } else {
          setError('No fue posible cargar la licencia médica.')
        }
      } finally {
        setLoading(false)
      }
    }

    cargarLicencia()
  }, [id])

  const fecha = (valor: string) =>
    new Date(`${valor.slice(0, 10)}T12:00:00`).toLocaleDateString('es-CL')

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status" />
        <p className="text-secondary mt-2">Cargando licencia...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <div className="alert alert-danger">{error}</div>
        <Link to="/licencias" className="btn btn-outline-secondary">
          Volver a licencias
        </Link>
      </div>
    )
  }

  if (!licencia) return null

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Detalle de licencia médica</h4>
          <p className="text-secondary mb-0">
            Folio: {licencia.folio}
          </p>
        </div>

        <Link to="/licencias" className="btn btn-outline-secondary">
          Volver
        </Link>
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header bg-white fw-semibold py-3">
          Información de la licencia
        </div>

        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <small className="text-secondary">Folio</small>
              <div className="fw-semibold">{licencia.folio}</div>
            </div>

            <div className="col-md-4">
              <small className="text-secondary">Fecha de emisión</small>
              <div>{fecha(licencia.fechaEmision)}</div>
            </div>

            <div className="col-md-4">
              <small className="text-secondary">Médico emisor</small>
              <div>#{licencia.medicoId}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header bg-white fw-semibold py-3">
          Antecedentes del paciente
        </div>

        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <small className="text-secondary">Nombre completo</small>
              <div>
                {licencia.paciente.nombres} {licencia.paciente.apellidos}
              </div>
            </div>

            <div className="col-md-6">
              <small className="text-secondary">RUT</small>
              <div>{licencia.paciente.rut}</div>
            </div>

            <div className="col-md-6">
              <small className="text-secondary">Fecha de nacimiento</small>
              <div>{fecha(licencia.paciente.fechaNacimiento)}</div>
            </div>

            <div className="col-md-6">
              <small className="text-secondary">Correo electrónico</small>
              <div>{licencia.paciente.email}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white fw-semibold py-3">
          Información del reposo
        </div>

        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <small className="text-secondary">Tipo de licencia</small>
              <div>{licencia.licencia.tipo}</div>
            </div>

            <div className="col-md-6">
              <small className="text-secondary">Diagnóstico</small>
              <div>{licencia.licencia.diagnostico}</div>
            </div>

            <div className="col-md-4">
              <small className="text-secondary">Inicio del reposo</small>
              <div>{fecha(licencia.licencia.fechaInicioReposo)}</div>
            </div>

            <div className="col-md-4">
              <small className="text-secondary">Días de reposo</small>
              <div>{licencia.licencia.diasReposo} días</div>
            </div>

            <div className="col-md-4">
              <small className="text-secondary">Modalidad</small>
              <div>{licencia.licencia.reposo}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}