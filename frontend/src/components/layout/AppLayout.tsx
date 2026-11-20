
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

export default function AppLayout() {
  return (
    <div className="d-flex min-vh-100">
      <Sidebar />

      <div className="flex-grow-1 d-flex flex-column min-vh-100">
        <Navbar />

        <main className="container-fluid p-4 flex-grow-1">
          <Outlet />
        </main>

        <footer className="bg-white border-top py-3 px-4">
          <small className="text-secondary">
            Medipass · Sistema de licencias médicasXXX
          </small>
        </footer>
      </div>
    </div>
  )
}
