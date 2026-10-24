import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Dashboard() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/services')
      .then(res => {
        setServices(res.data.data || [])
        setLoading(false)
      })
      .catch(err => {
        console.error('Gagal mengambil data:', err)
        setLoading(false)
      })
  }, [])

  return (
    <div className="flex flex-col min-h-screen justify-between pt-8">
      <div className="space-y-20 pb-16">
        {/* Section 1: Tentang Kami */}
        <section id="tentang" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">
                Tentang Serenity SPA
              </span>
              <h2 className="text-3xl font-bold text-slate-900">
                Pengalaman Relaksasi Terbaik Berstandar Profesional
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm">
                Serenity SPA menghadirkan keheningan dan kenyamanan terbaik bagi tubuh serta pikiran kamu. Didukung oleh terapis profesional bersertifikat dan minyak esensial alami berkualitas tinggi, setiap treatment dirancang untuk memulihkan energi serta menjaga kebugaran tubuh kamu secara optimal.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs">
                  <h4 className="font-bold text-emerald-700 text-lg">100% Organik</h4>
                  <p className="text-xs text-slate-500">Minyak & bahan alami pilihan</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs">
                  <h4 className="font-bold text-emerald-700 text-lg">Terapis Ahli</h4>
                  <p className="text-xs text-slate-500">Tersertifikasi & berpengalaman</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg h-80">
              <img
                src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800&auto=format&fit=crop"
                alt="Tentang Serenity SPA"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Section 2: Layanan */}
        <section id="layanan" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">
              Katalog Treatment
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Pilihan Layanan & Paket SPA
            </h1>
            <p className="text-slate-600">
              Pilih perawatan tubuh yang sesuai dengan kebutuhan kesehatan dan relaksasi kamu hari ini.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12 text-slate-500 font-medium">
              Memuat pilihan layanan SPA...
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-12 text-slate-500 font-medium">
              Belum ada layanan yang tersedia.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition duration-300 flex flex-col"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={
                        item.foto_url ||
                        "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=600&auto=format&fit=crop"
                      }
                      alt={item.nama}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">
                      {item.durasi || "60 Menit"}
                    </span>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-bold text-xl text-slate-800 mb-2">
                      {item.nama}
                    </h3>
                    <p className="text-slate-600 text-sm mb-6 flex-grow">
                      {item.deskripsi || "Pijat refleksi tubuh mendalam untuk melemaskan kekakuan otot dan melancarkan aliran darah."}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <span className="text-xl font-bold text-emerald-600">
                        Rp {item.harga ? item.harga.toLocaleString('id-ID') : '0'}
                      </span>
                      <Link
                        to={`/product/${item.id}`}
                        className="text-xs bg-slate-900 hover:bg-emerald-600 text-white font-semibold px-4 py-2 rounded-lg transition"
                      >
                        Detail
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Footer Full Black */}
      <footer id="kontak" className="bg-slate-900 text-white pt-16 pb-8 border-t border-slate-800 w-full mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="space-y-3">
              <span className="text-emerald-400 font-semibold text-xs uppercase tracking-wider">
                Hubungi Kami
              </span>
              <h3 className="text-2xl font-bold">Lokasi & Reservasi</h3>
              <p className="text-slate-400 text-sm">
                Siap merasakan ketenangan sejati? Datang langsung atau hubungi kami untuk reservasi jadwal perawatan kamu.
              </p>
            </div>
            <div className="space-y-3 border-t md:border-t-0 md:border-l border-slate-800 pt-6 md:pt-0 md:pl-8">
              <h4 className="font-semibold text-emerald-400 text-sm">Alamat & Kontak</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                Jl. Sunset Road No. 88, Kuta, Bali<br />
                Telepon: +62 812-3456-7890<br />
                Email: info@serenityspa.co.id
              </p>
            </div>
            <div className="space-y-3 border-t md:border-t-0 md:border-l border-slate-800 pt-6 md:pt-0 md:pl-8">
              <h4 className="font-semibold text-emerald-400 text-sm">Jam Operasional</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                Senin - Minggu: 09.00 - 21.00 WITA<br />
                <span className="text-slate-500 text-xs">*Reservasi disarankan 2 jam sebelum kedatangan.</span>
              </p>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
            © 2026 Serenity SPA. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}