import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { useState, useEffect } from 'react'

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/admin/login')
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/admin/login')
  }

  return (
    <div className="flex min-h-screen bg-slate-100 font-sans">
      <Sidebar sidebarOpen={sidebarOpen} />
      <div className="flex-1 flex flex-col">
        <header className="bg-white p-4 shadow-sm flex justify-between items-center border-b border-slate-200">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden p-2 border rounded text-slate-700">
              Menu
            </button>
            <h1 className="font-bold text-lg text-emerald-900">Dashboard Admin Serenity SPA</h1>
          </div>
          <button onClick={handleLogout} className="bg-red-50 text-red-600 hover:bg-red-100 px-3.5 py-1.5 rounded-md text-sm font-medium transition">
            Logout
          </button>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}