
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react'

import api from '../services/api'

interface User {
  id: number
  email: string
  nombre: string
  role: 'admin' | 'medico'
  rut?: string
}

interface AuthContextType {
  user: User | null
  login: (credentials: { email: string; password: string }) => Promise<void>
  logout: () => void
}

interface LoginResponse {
  token: string
  user: User
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  async function login(credentials: { email: string; password: string }) {
    const response = await api.post<LoginResponse>('/login', credentials)

    localStorage.setItem('token', response.data.token)
    setUser(response.data.user)
  }

  function logout() {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth debe utilizarse dentro de AuthProvider')
  }

  return context
}
