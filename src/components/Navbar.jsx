import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [user, setUser] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Gagal membaca data user:', error)
      }
    }
  }, [])

  // Menutup dropdown otomatis jika mengklik di luar menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.reload()
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-100 py-2 px-6 sm:px-12 flex items-center justify-between font-sans shadow-sm">
      {/* Brand Logo */}
      <Link to="/" className="text-emerald-800 font-extrabold text-xl tracking-tight flex items-center gap-2">
        <span>🌿</span> Serenity SPA
      </Link>

      {/* Menu Navigasi */}
      <div className={`${mobileMenuOpen ? 'flex' : 'hidden'} absolute md:static top-full left-0 right-0 md:flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-8 bg-white md:bg-transparent border-b md:border-0 border-slate-100 p-6 md:p-0 text-sm font-medium text-slate-600 shadow-md md:shadow-none`}>
        <a href="/#tentang" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-700 transition">Tentang Kami</a>
        <a href="/#layanan" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-700 transition">Layanan</a>
        <Link to="/saved" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-700 transition">Saved</Link>
        <Link to="/jadwal" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-700 transition">Jadwal Saya</Link>
        <a href="/#kontak" onClick={() => setMobileMenuOpen(false)} className="hover:text-emerald-700 transition">Kontak</a>
      </div>

      {/* Profile / Auth Section */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
          className="md:hidden p-1.5 text-slate-700 hover:bg-slate-100 rounded-lg"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
        {user ? (
          <div className="relative" ref={dropdownRef}>
            {/* Tombol Avatar Profile */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-3 p-1.5 rounded-full hover:bg-slate-100 transition cursor-pointer border border-slate-200"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </button>

            {/* Menu Dropdown Profil */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50">
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Akun Terhubung</p>
                  <p className="text-sm font-bold text-slate-800 capitalize truncate">{user.name}</p>
                  <p className="text-xs text-slate-500 truncate">{user.email}</p>
                </div>

                <div className="py-1">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout / Keluar
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2 px-5 rounded-xl transition shadow-md"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  )
}