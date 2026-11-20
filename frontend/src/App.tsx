
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import AppLayout from './components/layout/AppLayout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Licencias from './pages/Licencias'
import LicenciaDetalle from './pages/LicenciaDetalle'
import LicenciaNueva from './pages/LicenciaNueva'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
         <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} /> 
          <Route path="/licencias" element={<Licencias />} />
          <Route path="/licencias/nueva" element={<LicenciaNueva />} />
          <Route path="/licencias/:id" element={<LicenciaDetalle />} />
         </Route>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
