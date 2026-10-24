import { Link } from 'react-router-dom'
import { LayoutDashboard, Sparkles, LogOut } from 'lucide-react'

export default function Sidebar({ sidebarOpen }) {
  return (
    <aside className={`${sidebarOpen ? 'block' : 'hidden'} md:block w-64 bg-emerald-900 text-white min-h-screen p-4 flex flex-col justify-between shadow-lg`}>
      <div>
        <div className="font-bold text-xl mb-8 flex items-center gap-2 border-b border-emerald-800 pb-4">
          <Sparkles className="w-6 h-6 text-emerald-400" /> Admin SPA
        </div>
        <nav className="flex flex-col space-y-2">
          <Link to="/admin/dashboard" className="flex items-center gap-2.5 hover:bg-emerald-800 p-2.5 rounded-lg transition font-medium">
            <LayoutDashboard className="w-5 h-5 text-emerald-300" /> Kelola Layanan
          </Link>
        </nav>
      </div>
      <Link to="/" className="flex items-center gap-2 text-emerald-300 hover:text-white p-2.5 rounded-lg transition font-medium border-t border-emerald-800 pt-4">
        <LogOut className="w-5 h-5" /> Ke Frontpage
      </Link>
    </aside>
  )
}