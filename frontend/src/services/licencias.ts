
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

export interface NuevaLicencia {
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

export async function crearLicencia(data: NuevaLicencia) {
  const response = await api.post('/licencia', data)
  return response.data
}

export async function getLicencias(): Promise<Licencia[]> {
  const response = await api.get<Licencia[]>('/licencias')
  return response.data
}
export const getLicencia = async (id: string): Promise<Licencia> => {
  const response = await api.get<Licencia>(`/licencia/${id}`)
  return response.data
}