import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [service, setService] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isSaved, setIsSaved] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [bookingDate, setBookingDate] = useState('')
  const [bookingTime, setBookingTime] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('QRIS / E-Wallet')

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/services/${id}`)
      .then(res => {
        const itemData = res.data.data
        setService(itemData)
        setLoading(false)

        const currentSaved = JSON.parse(localStorage.getItem('saved_services') || '[]')
        setIsSaved(currentSaved.some(item => item.id === itemData?.id))
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [id])

  const toggleSave = () => {
    if (!service) return
    let currentSaved = JSON.parse(localStorage.getItem('saved_services') || '[]')
    const exists = currentSaved.some(item => item.id === service.id)

    if (exists) {
      currentSaved = currentSaved.filter(item => item.id !== service.id)
      setIsSaved(false)
    } else {
      currentSaved.push(service)
      setIsSaved(true)
    }

    localStorage.setItem('saved_services', JSON.stringify(currentSaved))
  }

  const handleBookingSubmit = (e) => {
    e.preventDefault()
    if (!bookingDate || !bookingTime) {
      alert('Pilih tanggal dan jam reservasi terlebih dahulu.')
      return
    }

    const currentJadwal = JSON.parse(localStorage.getItem('user_jadwal') || '[]')
    const newReservation = {
      id: Date.now(),
      service: service,
      tanggal: bookingDate,
      jam: bookingTime,
      metodePembayaran: paymentMethod,
      statusPembayaran: paymentMethod === 'Bayar di Tempat (Cash)' ? 'Belum Dibayar' : 'Lunas',
      createdAt: new Date().toISOString()
    }

    currentJadwal.push(newReservation)
    localStorage.setItem('user_jadwal', JSON.stringify(currentJadwal))
    setIsModalOpen(false)
    navigate('/jadwal')
  }

  if (loading) {
    return (
      <div className="py-16 max-w-7xl mx-auto px-4 text-center text-slate-500 font-medium">
        Memuat detail layanan...
      </div>
    )
  }

  if (!service) {
    return (
      <div className="py-16 max-w-7xl mx-auto px-4 text-center text-slate-500 font-medium">
        Layanan tidak ditemukan.
      </div>
    )
  }

  return (
    <div className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <Link
        to="/"
        className="inline-block mb-6 text-xs bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold px-4 py-2 rounded-lg transition"
      >
        ← Kembali ke Katalog
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2 h-64 md:h-auto relative">
          <img
            src={
              service.foto_url ||
              "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=600&auto=format&fit=crop"
            }
            alt={service.nama}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">
            {service.durasi || "60 Menit"}
          </span>
        </div>

        <div className="p-8 md:w-1/2 flex flex-col justify-between">
          <div>
            <span className="text-emerald-600 font-semibold text-xs uppercase tracking-wider block mb-2">
              {service.kategori?.nama || "Katalog Treatment"}
            </span>
            <h1 className="text-2xl font-bold text-slate-800 mb-4">{service.nama}</h1>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              {service.deskripsi || "Pijat refleksi tubuh mendalam untuk melemaskan kekakuan otot dan melancarkan aliran darah."}
            </p>
          </div>

          <div className="pt-6 border-t border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-semibold uppercase">Harga Paket</span>
              <span className="text-2xl font-bold text-emerald-600">
                Rp {service.harga ? service.harga.toLocaleString('id-ID') : '0'}
              </span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={toggleSave}
                className={`flex-1 text-xs font-semibold px-4 py-3 rounded-lg border transition flex items-center justify-center gap-2 ${
                  isSaved
                    ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {isSaved ? '❤️ Tersimpan' : '🤍 Simpan'}
              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                className="flex-1 text-xs bg-slate-900 hover:bg-emerald-600 text-white font-semibold px-4 py-3 rounded-lg transition"
              >
                Reservasi & Bayar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Reservasi & Pembayaran */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-100">
            <h3 className="font-bold text-xl text-slate-900 mb-1">Reservasi & Pembayaran</h3>
            <p className="text-slate-500 text-xs mb-4">
              Layanan: <strong className="text-emerald-700">{service.nama}</strong>
            </p>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                    Tanggal
                  </label>
                  <input
                    type="date"
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-xs focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                    Jam
                  </label>
                  <input
                    type="time"
                    required
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-xs focus:border-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                  Metode Pembayaran
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg p-2.5 text-xs font-medium text-slate-800 focus:border-emerald-600 focus:outline-none"
                >
                  <option value="QRIS / E-Wallet">QRIS / GoPay / OVO / Dana</option>
                  <option value="Transfer Bank (BCA)">Transfer Bank (BCA)</option>
                  <option value="Bayar di Tempat (Cash)">Bayar di Tempat (Cash)</option>
                </select>
              </div>

              {/* Ringkasan Pembayaran */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Harga Layanan</span>
                  <span>Rp {service.harga ? service.harga.toLocaleString('id-ID') : '0'}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Biaya Layanan</span>
                  <span className="text-emerald-600 font-semibold">Gratis</span>
                </div>
                <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-slate-900 text-sm">
                  <span>Total Bayar</span>
                  <span className="text-emerald-600">
                    Rp {service.harga ? service.harga.toLocaleString('id-ID') : '0'}
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition"
                >
                  Bayar & Konfirmasi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}