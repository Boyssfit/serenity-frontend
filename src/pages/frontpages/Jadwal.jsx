import { useEffect, useState } from 'react'

export default function Jadwal() {
  const [jadwalList, setJadwalList] = useState([])

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('user_jadwal') || '[]')
    setJadwalList(list)
  }, [])

  const cancelReservation = (id) => {
    if (window.confirm('Yakin ingin membatalkan reservasi ini?')) {
      const updated = jadwalList.filter(item => item.id !== id)
      setJadwalList(updated)
      localStorage.setItem('user_jadwal', JSON.stringify(updated))
    }
  }

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Jadwal Reservasi</h1>
        <p className="text-slate-600 text-sm">Daftar perawatan yang sudah kamu pesan beserta informasi pembayaran.</p>
      </div>

      {jadwalList.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-xs">
          <p className="text-slate-500">Belum ada jadwal reservasi aktif.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jadwalList.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full inline-block mb-2">
                    Terjadwal
                  </span>
                  <h3 className="font-bold text-lg text-slate-800">{item.service.nama}</h3>
                  <p className="text-slate-500 text-xs">
                    📅 {item.tanggal} &nbsp;|&nbsp; ⏰ {item.jam} WITA
                  </p>
                </div>

                <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                  item.statusPembayaran === 'Lunas'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-amber-100 text-amber-700'
                }`}>
                  {item.statusPembayaran || 'Lunas'}
                </span>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                <div>
                  <span className="text-slate-400 block">Metode Pembayaran</span>
                  <span className="font-semibold text-slate-700">{item.metodePembayaran || 'QRIS / E-Wallet'}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block">Total</span>
                  <span className="font-bold text-slate-900 text-sm">
                    Rp {item.service.harga ? item.service.harga.toLocaleString('id-ID') : '0'}
                  </span>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => cancelReservation(item.id)}
                  className="text-xs bg-red-50 text-red-600 hover:bg-red-100 font-semibold px-4 py-2 rounded-lg transition"
                >
                  Batalkan Reservasi
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}