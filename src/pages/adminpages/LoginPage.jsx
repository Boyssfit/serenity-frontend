import { useState } from 'react'
import axios from 'axios'

export default function Login() {
  const [isRegister, setIsRegister] = useState(false)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type })
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 4000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    const endpoint = isRegister
      ? 'http://127.0.0.1:8000/api/register'
      : 'http://127.0.0.1:8000/api/login'

    axios.post(endpoint, formData)
      .then(res => {
        setLoading(false)
        if (res.data.token) {
          localStorage.setItem('token', res.data.token)
          showToast(isRegister ? 'Pendaftaran berhasil! Mengalihkan...' : 'Berhasil masuk!', 'success')
          setTimeout(() => {
            window.location.href = '/admin/dashboard'
          }, 1000)
        } else {
          showToast(res.data.message || 'Proses berhasil!', 'success')
          if (isRegister) setIsRegister(false)
        }
      })
      .catch(err => {
        setLoading(false)
        showToast(err.response?.data?.message || 'Terjadi kesalahan pada server.', 'error')
      })
  }

  const handleGoogleLogin = () => {
    // Arahkan ke endpoint OAuth Google backend jika sudah siap
    showToast('Fitur login Google akan segera aktif!', 'success')
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 sm:p-6 md:p-10 font-sans">
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-6 right-6 z-50 animate-bounce-short">
          <div className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl backdrop-blur-md border text-white text-xs font-medium ${
            toast.type === 'success' ? 'bg-emerald-900/90 border-emerald-500/30' : 'bg-rose-900/90 border-rose-500/30'
          }`}>
            <span>{toast.type === 'success' ? '✓' : '✕'}</span>
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Main Container Card Split Screen */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 border border-slate-200/60">
        
        {/* Sisi Kiri: Form Input */}
        <div className="p-8 sm:p-12 flex flex-col justify-center">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-extrabold uppercase tracking-widest mb-3">
              ✦ Serenity SPA
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {isRegister ? 'Buat Akun Baru' : 'WELCOME BACK'}
            </h2>
            <p className="text-slate-500 text-xs mt-1">
              {isRegister 
                ? 'Daftarkan akunmu untuk menikmati layanan SPA eksklusif.' 
                : 'Selamat datang kembali! Silakan masukkan detail akunmu.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {isRegister && (
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Contoh: Sarah Budi"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus:bg-white focus:border-emerald-600 focus:outline-none transition-all font-medium"
                />
              </div>
            )}

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus:bg-white focus:border-emerald-600 focus:outline-none transition-all font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus:bg-white focus:border-emerald-600 focus:outline-none transition-all font-medium"
              />
            </div>

            {isRegister && (
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Konfirmasi Password</label>
                <input
                  type="password"
                  required
                  value={formData.password_confirmation}
                  onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus:bg-white focus:border-emerald-600 focus:outline-none transition-all font-medium"
                />
              </div>
            )}

            {!isRegister && (
              <div className="flex items-center justify-between text-[11px] pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                  <input type="checkbox" className="rounded border-slate-300 text-emerald-700 focus:ring-emerald-500" />
                  <span>Remember me</span>
                </label>
                <a href="#forgot" className="font-bold text-slate-700 hover:text-emerald-700 transition">
                  Forgot password
                </a>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-rose-500/20 transition-all cursor-pointer disabled:opacity-50 mt-2"
            >
              {loading ? 'Memproses...' : isRegister ? 'Daftar Sekarang' : 'Sign in'}
            </button>

            {/* Tombol Google */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold py-3 rounded-2xl flex items-center justify-center gap-3 transition cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.25 21.32 7.33 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.25 2.68 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              <span>Sign in with Google</span>
            </button>
          </form>

          {/* Toggle Daftar / Masuk */}
          <div className="text-center text-xs text-slate-500 mt-6">
            {isRegister ? (
              <p>
                Sudah punya akun?{' '}
                <button
                  onClick={() => setIsRegister(false)}
                  className="font-bold text-rose-500 hover:underline cursor-pointer"
                >
                  Masuk di sini
                </button>
              </p>
            ) : (
              <p>
                Don't have an account?{' '}
                <button
                  onClick={() => setIsRegister(true)}
                  className="font-bold text-rose-500 hover:underline cursor-pointer"
                >
                  Sign up for free!
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Sisi Kanan: Visual & Deskripsi Website Serenity SPA */}
        <div className="relative hidden md:flex flex-col justify-between p-10 bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 text-white overflow-hidden">
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl"></div>

          {/* Background SPA Image Overlay */}
          <img
            src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1000&auto=format&fit=crop"
            alt="Serenity SPA Therapy"
            className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-overlay"
          />

          <div className="relative z-10">
            <span className="text-3xl">🌿</span>
          </div>

          <div className="relative z-10 space-y-3">
            <h3 className="text-2xl font-extrabold tracking-tight leading-snug">
              Temukan Ketenangan & Perawatan Diri Terbaik
            </h3>
            <p className="text-xs text-emerald-100/80 leading-relaxed">
              Serenity SPA menghadirkan pengalaman pijat tradisional, aromatherapy herbal, dan perawatan wajah eksklusif yang dirancang khusus untuk merelaksasi jiwa dan raga.
            </p>
          </div>

          <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between text-[11px] text-emerald-200/70">
            <span>✦ Terapi Profesional</span>
            <span>✦ Bahan Alami</span>
            <span>✦ Reservasi Praktis</span>
          </div>
        </div>

      </div>
    </div>
  )
}