
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      await login({ email, password })
      navigate('/dashboard')
    } catch {
      setError('Correo o contraseña incorrectos.')
    } finally {
      setSubmitting(false)
    }
  }

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

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Correo electrónico</label>
                  <input
                    type="email"
                    required
                    className="form-control"
                    placeholder="usuario@clinica.cl"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Contraseña</label>
                  <input
                    type="password"
                    required
                    className="form-control"
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>

                {error && (
                  <div className="alert alert-danger py-2">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={submitting}
                >
                  {submitting ? 'Ingresando...' : 'Iniciar sesión'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
