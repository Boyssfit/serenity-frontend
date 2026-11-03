import { useState } from "react";
import { useProducts } from "../../utils/useProducts";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ProductForm() {
  const { addProduct, categories, categoriesIsLoading, categoriesError, isAdding } =
    useProducts();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama: "",
    category_id: "",
    durasi: "60 Menit",
    harga: "",
    deskripsi: "",
  });
  const [fotoFile, setFotoFile] = useState(null);
  const [errors, setErrors] = useState({});
  const categoryId =
    formData.category_id || (categories[0] ? String(categories[0].id) : "");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "foto") {
      setFotoFile(files?.[0] || null);
      return;
    }
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const data = new FormData();
    Object.entries({ ...formData, category_id: categoryId }).forEach(
      ([key, value]) => data.append(key, value),
    );
    if (fotoFile) data.append("foto", fotoFile);

    try {
      await addProduct(data);
      toast.success("Layanan SPA berhasil disimpan!");
      navigate("/admin/dashboard");
    } catch (error) {
      const validationErrors = error.response?.data?.errors;
      if (validationErrors) {
        setErrors(validationErrors);
        toast.error("Periksa kembali data yang dimasukkan.");
      } else {
        toast.error(
          error.response?.data?.message || error.message || "Gagal menyimpan layanan SPA.",
        );
      }
    }
  };

  const fieldError = (name) => {
    const error = errors[name];
    return Array.isArray(error) ? error[0] : error;
  };

  return (
    <div className="min-h-screen bg-slate-600 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-3xl p-8 shadow-xl space-y-5"
      >
        <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-2">
          Tambah Layanan SPA Baru
        </h2>

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-slate-700 mb-1.5">
            Nama Layanan
          </label>
          <input
            type="text"
            name="nama"
            required
            placeholder="Contoh: Traditional Bali Massage"
            value={formData.nama}
            onChange={handleChange}
            className={`border rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              fieldError("nama") ? "border-red-500" : "border-slate-200"
            }`}
          />
          {fieldError("nama") && (
            <p className="text-red-500 text-xs mt-1">{fieldError("nama")}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-slate-700 mb-1.5">
              Kategori
            </label>
            <select
              name="category_id"
              required
              value={categoryId}
              onChange={handleChange}
              disabled={
                categoriesIsLoading || Boolean(categoriesError) || categories.length === 0
              }
              className="border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white disabled:bg-slate-100"
            >
              {categoriesIsLoading && <option value="">Memuat kategori...</option>}
              {!categoriesIsLoading &&
                !categoriesError &&
                categories.length === 0 && (
                  <option value="">Kategori belum tersedia</option>
                )}
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.nama || category.category || `Kategori ${category.id}`}
                </option>
              ))}
            </select>
            {categoriesError && (
              <p className="text-red-500 text-xs mt-1">
                Gagal memuat kategori: {categoriesError.message}
              </p>
            )}
            {!categoriesIsLoading &&
              !categoriesError &&
              categories.length === 0 && (
                <p className="text-slate-500 text-xs mt-1">
                  Belum ada kategori yang tersedia.
                </p>
              )}
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold text-slate-700 mb-1.5">
              Durasi
            </label>
            <input
              type="text"
              name="durasi"
              required
              placeholder="60 Menit"
              value={formData.durasi}
              onChange={handleChange}
              className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {fieldError("durasi") && (
              <p className="text-red-500 text-xs mt-1">{fieldError("durasi")}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-slate-700 mb-1.5">
            Harga (Rp)
          </label>
          <input
            type="number"
            name="harga"
            required
            min="0"
            placeholder="150000"
            value={formData.harga}
            onChange={handleChange}
            className={`border rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              fieldError("harga") ? "border-red-500" : "border-slate-200"
            }`}
          />
          {fieldError("harga") && (
            <p className="text-red-500 text-xs mt-1">{fieldError("harga")}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-slate-700 mb-1.5">
            Deskripsi
          </label>
          <textarea
            name="deskripsi"
            rows="3"
            placeholder="Deskripsi singkat perawatan..."
            value={formData.deskripsi}
            onChange={handleChange}
            className="border border-slate-200 rounded-xl p-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
          />
          {fieldError("deskripsi") && (
            <p className="text-red-500 text-xs mt-1">{fieldError("deskripsi")}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold text-slate-700 mb-1.5">
            Pilih Gambar Foto
          </label>
          <div className="border border-slate-200 rounded-xl p-2 bg-white flex items-center">
            <input
              type="file"
              name="foto"
              accept="image/*"
              onChange={handleChange}
              className="text-sm text-slate-500 file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
            />
          </div>
          {fieldError("foto") && (
            <p className="text-red-500 text-xs mt-1">{fieldError("foto")}</p>
          )}
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => navigate("/admin/dashboard")}
            className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition duration-150"
          >
            Kembali ke Manajemen
          </button>
          <button
            type="submit"
            disabled={
              isAdding ||
              categoriesIsLoading ||
              Boolean(categoriesError) ||
              categories.length === 0
            }
            className="px-6 py-2 bg-[#007a55] hover:bg-[#006344] text-white text-sm font-semibold rounded-xl transition duration-150 shadow-sm disabled:opacity-60"
          >
            {isAdding ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  );
}
