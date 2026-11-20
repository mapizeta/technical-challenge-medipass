
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { validarRut } from '../utils/validarRut'
import { crearLicencia } from '../services/licencias'

interface FormData {
  rut: string
  nombres: string
  apellidos: string
  fechaNacimiento: string
  email: string
  tipo: string
  fechaInicioReposo: string
  diasReposo: string
  diagnostico: string
  reposo: string
}

const initialForm: FormData = {
  rut: '',
  nombres: '',
  apellidos: '',
  fechaNacimiento: '',
  email: '',
  tipo: 'Enfermedad o accidente común',
  fechaInicioReposo: '',
  diasReposo: '5',
  diagnostico: '',
  reposo: 'Total',
}

export default function LicenciaNueva() {
    const navigate = useNavigate()
    const [submitting, setSubmitting] = useState(false)
    const [serverError, setServerError] = useState('')
    const [form, setForm] = useState<FormData>(initialForm)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [showConfirmation, setShowConfirmation] = useState(false)

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }))

    setErrors((previous) => ({
      ...previous,
      [name]: '',
    }))
  }

async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault()

  const newErrors: Record<string, string> = {}

  if (!form.rut.trim()) newErrors.rut = 'Ingresa el RUT del paciente.'
  if (!form.nombres.trim()) newErrors.nombres = 'Ingresa los nombres.'
  if (!form.apellidos.trim()) newErrors.apellidos = 'Ingresa los apellidos.'
  if (!form.fechaNacimiento) newErrors.fechaNacimiento = 'Ingresa la fecha de nacimiento.'
  if (!form.email.trim()) newErrors.email = 'Ingresa el correo electrónico.'
  if (!form.fechaInicioReposo) newErrors.fechaInicioReposo = 'Selecciona la fecha de inicio.'
  if (!form.diagnostico.trim()) newErrors.diagnostico = 'Ingresa el diagnóstico.'

  const dias = Number(form.diasReposo)

  if (!Number.isInteger(dias) || dias < 1 || dias > 30) {
    newErrors.diasReposo = 'Los días de reposo deben estar entre 1 y 30.'
  }

  if (!validarRut(form.rut)) {
    newErrors.rut = 'El RUT ingresado no es válido.'
  }

  setErrors(newErrors)

  if (Object.keys(newErrors).length > 0) return

  try {
    setSubmitting(true)
    setServerError('')

    await crearLicencia({
      paciente: {
        rut: form.rut,
        nombres: form.nombres,
        apellidos: form.apellidos,
        fechaNacimiento: form.fechaNacimiento,
        email: form.email,
      },
      licencia: {
        tipo: form.tipo,
        fechaInicioReposo: form.fechaInicioReposo,
        diasReposo: dias,
        diagnostico: form.diagnostico,
        reposo: form.reposo,
      },
    })

    navigate('/licencias')
  } catch (error: any) {
    const data = error.response?.data

    if (error.response?.status === 422 && data) {
      const backendErrors: Record<string, string> = {}

      Object.entries(data).forEach(([field, messages]) => {
        backendErrors[field] = Array.isArray(messages)
          ? String(messages[0])
          : String(messages)
      })

      setErrors(backendErrors)
    } else if (error.response?.status === 403) {
      setServerError('No tienes permisos para emitir licencias médicas.')
    } else {
      setServerError('No fue posible emitir la licencia médica.')
    }
  } finally {
    setSubmitting(false)
  }
}

  function resetForm() {
    setForm(initialForm)
    setErrors({})
    setShowConfirmation(false)
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="fw-bold mb-1">Nueva licencia médica</h4>
          <p className="text-secondary mb-0">
            Completa los antecedentes para generar una nueva licencia.
          </p>
        </div>

        <Link to="/licencias" className="btn btn-outline-secondary">
          Volver
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-header bg-white py-3">
            <h6 className="fw-semibold mb-0">1. Antecedentes del paciente</h6>
          </div>

          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">RUT</label>
                <input
                  name="rut"
                  className={`form-control ${errors.rut ? 'is-invalid' : ''}`}
                  value={form.rut}
                  onChange={handleChange}
                  placeholder="12.345.678-9"
                />
                {errors.rut && <div className="invalid-feedback">{errors.rut}</div>}
              </div>

              <div className="col-md-4">
                <label className="form-label">Nombres</label>
                <input
                  name="nombres"
                  className={`form-control ${errors.nombres ? 'is-invalid' : ''}`}
                  value={form.nombres}
                  onChange={handleChange}
                  placeholder="Nombres del paciente"
                />
                {errors.nombres && <div className="invalid-feedback">{errors.nombres}</div>}
              </div>

              <div className="col-md-4">
                <label className="form-label">Apellidos</label>
                <input
                  name="apellidos"
                  className={`form-control ${errors.apellidos ? 'is-invalid' : ''}`}
                  value={form.apellidos}
                  onChange={handleChange}
                  placeholder="Apellidos del paciente"
                />
                {errors.apellidos && <div className="invalid-feedback">{errors.apellidos}</div>}
              </div>

              <div className="col-md-6">
                <label className="form-label">Fecha de nacimiento</label>
                <input
                  type="date"
                  name="fechaNacimiento"
                  className={`form-control ${errors.fechaNacimiento ? 'is-invalid' : ''}`}
                  value={form.fechaNacimiento}
                  onChange={handleChange}
                />
                {errors.fechaNacimiento && <div className="invalid-feedback">{errors.fechaNacimiento}</div>}
              </div>

              <div className="col-md-6">
                <label className="form-label">Correo electrónico</label>
                <input
                  type="email"
                  name="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  value={form.email}
                  onChange={handleChange}
                  placeholder="paciente@correo.cl"
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
            </div>
          </div>
        </div>

        <div className="card border-0 shadow-sm mb-4">
          <div className="card-header bg-white py-3">
            <h6 className="fw-semibold mb-0">2. Información de la licencia</h6>
          </div>

          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Tipo de licencia</label>
                <select
                  name="tipo"
                  className="form-select"
                  value={form.tipo}
                  onChange={handleChange}
                >
                  <option>Enfermedad o accidente común</option>
                  <option>Prórroga de medicina preventiva</option>
                  <option>Licencia maternal</option>
                  <option>Enfermedad grave del niño menor de un año</option>
                  <option>Accidente del trabajo o trayecto</option>
                  <option>Enfermedad profesional</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Fecha de inicio del reposo</label>
                <input
                  type="date"
                  name="fechaInicioReposo"
                  className={`form-control ${errors.fechaInicioReposo ? 'is-invalid' : ''}`}
                  value={form.fechaInicioReposo}
                  onChange={handleChange}
                />
                {errors.fechaInicioReposo && <div className="invalid-feedback">{errors.fechaInicioReposo}</div>}
              </div>

              <div className="col-md-6">
                <label className="form-label">Días de reposo</label>
                <input
                  type="number"
                  name="diasReposo"
                  min="1"
                  max="30"
                  className={`form-control ${errors.diasReposo ? 'is-invalid' : ''}`}
                  value={form.diasReposo}
                  onChange={handleChange}
                />
                {errors.diasReposo && <div className="invalid-feedback">{errors.diasReposo}</div>}
              </div>

              <div className="col-md-6">
                <label className="form-label">Tipo de reposo</label>
                <select
                  name="reposo"
                  className="form-select"
                  value={form.reposo}
                  onChange={handleChange}
                >
                  <option>Total</option>
                  <option>Parcial</option>
                </select>
              </div>

              <div className="col-12">
                <label className="form-label">Diagnóstico</label>
                <textarea
                  name="diagnostico"
                  rows={3}
                  className={`form-control ${errors.diagnostico ? 'is-invalid' : ''}`}
                  value={form.diagnostico}
                  onChange={handleChange}
                  placeholder="Describe el diagnóstico médico..."
                />
                {errors.diagnostico && <div className="invalid-feedback">{errors.diagnostico}</div>}
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2 mb-4">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={resetForm}
          >
            Limpiar formulario
          </button>
        
        {serverError && (
        <div className="alert alert-danger">
            {serverError}
        </div>
        )}
        
        <button
        type="submit"
        className="btn btn-primary"
        disabled={submitting}
        >
        {submitting ? 'Emitiendo...' : 'Emitir licencia'}
        </button>
        </div>
      </form>

    </div>
  )
}
