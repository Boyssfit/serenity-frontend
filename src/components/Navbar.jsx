import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()
  const [activeSection, setActiveSection] = useState('tentang')

  useEffect(() => {
    if (location.pathname === '/saved') {
      setActiveSection('saved')
    } else if (location.pathname === '/jadwal') {
      setActiveSection('jadwal')
    } else if (location.pathname === '/') {
      const hash = location.hash.replace('#', '')
      if (hash) {
        setActiveSection(hash)
      } else {
        setActiveSection('tentang')
      }
    }
  }, [location])

  const handleScroll = (id) => {
    setActiveSection(id)
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`
      return
    }
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const getMenuClass = (sectionName) => {
    const baseClass = "h-16 inline-flex items-center text-sm transition-all duration-200 cursor-pointer border-b-2 "
    if (activeSection === sectionName) {
      return baseClass + "text-emerald-700 border-emerald-600 font-bold"
    }
    return baseClass + "text-slate-600 border-transparent hover:text-emerald-600 hover:border-slate-300 font-medium"
  }

  return (
    <nav className="bg-white border-b border-slate-100 shadow-xs sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center relative">
          {/* Logo Kiri */}
          <div className="flex items-center">
            <Link to="/" className="font-bold text-xl text-emerald-700 tracking-tight">
              Serenity SPA
            </Link>
          </div>

          {/* Menu Tengah dengan Garis Bawah Aktif */}
          <div className="hidden md:flex items-center space-x-6 absolute left-1/2 -translate-x-1/2 h-16">
            <button
              onClick={() => handleScroll('tentang')}
              className={getMenuClass('tentang')}
            >
              Tentang Kami
            </button>
            <button
              onClick={() => handleScroll('layanan')}
              className={getMenuClass('layanan')}
            >
              Layanan
            </button>
            <Link
              to="/saved"
              className={getMenuClass('saved')}
            >
              Saved
            </Link>
            <Link
              to="/jadwal"
              className={getMenuClass('jadwal')}
            >
              Jadwal Saya
            </Link>
            <button
              onClick={() => handleScroll('kontak')}
              className={getMenuClass('kontak')}
            >
              Kontak
            </button>
          </div>

          {/* Tombol Kanan */}
          <div className="flex items-center">
            <Link
              to="/admin/login"
              className="text-xs bg-slate-900 hover:bg-emerald-600 text-white font-semibold px-4 py-2 rounded-lg transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}