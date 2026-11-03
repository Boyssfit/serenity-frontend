import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useProducts } from '../../utils/useProducts'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const {
    services,
    categories,
    isLoading,
    servicesError,
    categoriesIsLoading,
    categoriesError,
    updateProduct,
    deleteProduct,
    isUpdating,
  } = useProducts()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editId, setEditId] = useState(null)
  const [formData, setFormData] = useState({
    nama: '',
    category_id: '',
    durasi: '60 Menit',
    harga: '',
    deskripsi: '',
  })
  const [fotoFile, setFotoFile] = useState(null)

  const openEditModal = (item) => {
    setEditId(item.id)
    setFormData({
      nama: item.nama || '',
      category_id: item.category?.id || item.category_id || categories[0]?.id || '',
      durasi: item.durasi || '60 Menit',
      harga: item.harga || '',
      deskripsi: item.deskripsi || '',
    })
    setFotoFile(null)
    setIsModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = new FormData()
    Object.entries(formData).forEach(([key, value]) => data.append(key, value))
    if (fotoFile) data.append('foto', fotoFile)

    try {
      await updateProduct(editId, data)
      toast.success('Layanan berhasil diperbarui.')
      setIsModalOpen(false)
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Gagal memperbarui layanan.')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus layanan ini?')) return

    try {
      await deleteProduct(id)
      toast.success('Layanan berhasil dihapus.')
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Gagal menghapus layanan.')
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Manajemen Layanan SPA</h2>
            <p className="text-slate-500 text-xs">Daftar semua paket terapi dan pijat</p>
          </div>
          <button
            onClick={() => navigate('/admin/add-service')}
            className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition cursor-pointer"
          >
            + Tambah Layanan
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-8 text-slate-400 text-sm">Memuat data layanan...</div>
        ) : servicesError ? (
          <div className="text-center py-8 text-red-600 text-sm">
            Gagal memuat layanan: {servicesError.message}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-100">
                <tr>
                  <th className="p-3">NAMA LAYANAN</th>
                  <th className="p-3">KATEGORI</th>
                  <th className="p-3">DURASI</th>
                  <th className="p-3">HARGA</th>
                  <th className="p-3 text-center">AKSI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {services.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-slate-400">
                      Belum ada layanan. Klik "+ Tambah Layanan" untuk menambahkan.
                    </td>
                  </tr>
                ) : (
                  services.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition">
                      <td className="p-3 font-semibold text-slate-800">{item.nama}</td>
                      <td className="p-3 text-slate-600">{item.category?.nama || 'Umum'}</td>
                      <td className="p-3 text-slate-600">{item.durasi || '60 Menit'}</td>
                      <td className="p-3 font-semibold text-emerald-600">
                        Rp {Number(item.harga || 0).toLocaleString('id-ID')}
                      </td>
                      <td className="p-3 flex justify-center gap-2">
                        <button
                          onClick={() => openEditModal(item)}
                          className="bg-amber-50 text-amber-600 hover:bg-amber-100 px-3 py-1.5 rounded-md font-semibold transition cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-md font-semibold transition cursor-pointer"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-100">
            <h3 className="font-bold text-lg text-slate-900 mb-4">Edit Layanan SPA</h3>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nama Layanan</label>
                <input
                  type="text"
                  required
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  placeholder="Contoh: Traditional Bali Massage"
                  className="w-full border border-slate-200 rounded-lg p-2.5 focus:border-emerald-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Kategori</label>
                  <select
                    value={formData.category_id}
                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                    className="w-full border border-slate-200 rounded-lg p-2.5 focus:border-emerald-600 focus:outline-none bg-white"
                    required
                    disabled={categoriesIsLoading || Boolean(categoriesError) || categories.length === 0}
                  >
                    {categoriesIsLoading && <option value="">Memuat kategori...</option>}
                    {categoriesError && <option value="">Kategori gagal dimuat</option>}
                    {!categoriesIsLoading && !categoriesError && categories.length === 0 && (
                      <option value="">Kategori belum tersedia</option>
                    )}
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.nama || cat.category || `Kategori ${cat.id}`}
                      </option>
                    ))}
                  </select>
                  {categoriesError && (
                    <p className="text-red-600 mt-1">Gagal memuat kategori: {categoriesError.message}</p>
                  )}
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Durasi</label>
                  <input
                    type="text"
                    required
                    value={formData.durasi}
                    onChange={(e) => setFormData({ ...formData, durasi: e.target.value })}
                    placeholder="60 Menit"
                    className="w-full border border-slate-200 rounded-lg p-2.5 focus:border-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Harga (Rp)</label>
                <input
                  type="number"
                  required
                  value={formData.harga}
                  onChange={(e) => setFormData({ ...formData, harga: e.target.value })}
                  placeholder="150000"
                  className="w-full border border-slate-200 rounded-lg p-2.5 focus:border-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Deskripsi</label>
                <textarea
                  rows="3"
                  value={formData.deskripsi}
                  onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                  placeholder="Deskripsi singkat perawatan..."
                  className="w-full border border-slate-200 rounded-lg p-2.5 focus:border-emerald-600 focus:outline-none"
                ></textarea>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Pilih Gambar Foto</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFotoFile(e.target.files[0] || null)}
                  className="w-full border border-slate-200 rounded-lg p-2 focus:border-emerald-600 focus:outline-none file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200 transition cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={
                    isUpdating ||
                    categoriesIsLoading ||
                    Boolean(categoriesError) ||
                    categories.length === 0
                  }
                  className="px-4 py-2 bg-emerald-700 text-white rounded-lg font-semibold hover:bg-emerald-800 transition cursor-pointer disabled:opacity-60"
                >
                  {isUpdating ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
