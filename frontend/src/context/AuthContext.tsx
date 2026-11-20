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
  token: string | null
  login: (credentials: { email: string; password: string }) => Promise<void>
  logout: () => void
}

interface LoginResponse {
  access: string
  user: User
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })

  const [token, setToken] = useState<string | null>(
    () => localStorage.getItem('token')
  )

  async function login(credentials: { email: string; password: string }) {
    const response = await api.post<LoginResponse>('/login', credentials)
    const data = response.data

    localStorage.setItem('token', data.access)
    localStorage.setItem('user', JSON.stringify(data.user))

    setToken(data.access)
    setUser(data.user)
  }

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
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