
import api from './api'

export interface Licencia {
  id: string
  folio: string
  fechaEmision: string
  medicoId: number
  paciente: {
    rut: string
    nombres: string
    apellidos: string
    fechaNacimiento: string
    email: string
  }
  licencia: {
    tipo: string
    fechaInicioReposo: string
    diasReposo: number
    diagnostico: string
    reposo: string
  }
}

export async function getLicencias(): Promise<Licencia[]> {
  const response = await api.get<Licencia[]>('/licencias')
  return response.data
}
