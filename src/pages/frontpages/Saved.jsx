import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Saved() {
  const [savedItems, setSavedItems] = useState([])
  const [selectedService, setSelectedService] = useState(null)
  const [bookingDate, setBookingDate] = useState('')
  const [bookingTime, setBookingTime] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('QRIS / E-Wallet')
  const navigate = useNavigate()

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('saved_services') || '[]')
    setSavedItems(items)
  }, [])

  const removeItem = (id) => {
    const updated = savedItems.filter(item => item.id !== id)
    setSavedItems(updated)
    localStorage.setItem('saved_services', JSON.stringify(updated))
  }

  const handleBookingSubmit = (e) => {
    e.preventDefault()
    if (!bookingDate || !bookingTime) return

    const currentJadwal = JSON.parse(localStorage.getItem('user_jadwal') || '[]')
    const newReservation = {
      id: Date.now(),
      service: selectedService,
      tanggal: bookingDate,
      jam: bookingTime,
      metodePembayaran: paymentMethod,
      statusPembayaran: paymentMethod === 'Bayar di Tempat (Cash)' ? 'Belum Dibayar' : 'Lunas',
      createdAt: new Date().toISOString()
    }

    currentJadwal.push(newReservation)
    localStorage.setItem('user_jadwal', JSON.stringify(currentJadwal))
    setSelectedService(null)
    navigate('/jadwal')
  }

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Saved Treatment</h1>
        <p className="text-slate-600 text-sm">Daftar layanan favorit yang disukai.</p>
      </div>

      {savedItems.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-xs">
          <p className="text-slate-500">Belum ada layanan yang kamu simpan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {savedItems.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
              <div className="h-48 overflow-hidden relative">
                <img src={item.foto_url || "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=600&auto=format&fit=crop"} alt={item.nama} className="w-full h-full object-cover" />
                <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">
                  {item.durasi || "60 Menit"}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="font-bold text-xl text-slate-800 mb-2">{item.nama}</h3>
                  <p className="text-slate-600 text-sm mb-4">{item.deskripsi}</p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-lg font-bold text-emerald-600">
                    Rp {item.harga ? item.harga.toLocaleString('id-ID') : '0'}
                  </span>
                  <div className="flex gap-2">
                    <button onClick={() => removeItem(item.id)} className="text-xs bg-red-50 text-red-600 hover:bg-red-100 font-semibold px-3 py-2 rounded-lg transition">
                      Hapus
                    </button>
                    <button onClick={() => setSelectedService(item)} className="text-xs bg-slate-900 hover:bg-emerald-600 text-white font-semibold px-3 py-2 rounded-lg transition">
                      Reservasi
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Reservasi & Pembayaran */}
      {selectedService && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-100">
            <h3 className="font-bold text-xl text-slate-900 mb-1">Reservasi & Pembayaran</h3>
            <p className="text-slate-500 text-xs mb-4">
              Layanan: <strong className="text-emerald-700">{selectedService.nama}</strong>
            </p>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Tanggal</label>
                  <input type="date" required value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} className="w-full border border-slate-200 rounded-lg p-2.5 text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Jam</label>
                  <input type="time" required value={bookingTime} onChange={(e) => setBookingTime(e.target.value)} className="w-full border border-slate-200 rounded-lg p-2.5 text-xs" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">Metode Pembayaran</label>
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

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Harga Layanan</span>
                  <span>Rp {selectedService.harga ? selectedService.harga.toLocaleString('id-ID') : '0'}</span>
                </div>
                <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-slate-900 text-sm">
                  <span>Total Bayar</span>
                  <span className="text-emerald-600">
                    Rp {selectedService.harga ? selectedService.harga.toLocaleString('id-ID') : '0'}
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setSelectedService(null)} className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold">Batal</button>
                <button type="submit" className="px-4 py-2.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold">Bayar & Konfirmasi</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}