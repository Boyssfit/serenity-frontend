import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased flex flex-col justify-between">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}