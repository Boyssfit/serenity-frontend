import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import AdminLayout from './layouts/AdminLayout'

// Import Halaman Login
import LoginPage from './pages/LoginPage'

// Import Halaman Admin
import AdminDashboard from './pages/adminpages/AdminDashboard'
import ProductForm from './pages/adminpages/ProductForm'

// Import Halaman Front/User
import Dashboard from './pages/frontpages/Dashboard'
import Jadwal from './pages/frontpages/Jadwal'
import ProductDetail from './pages/frontpages/ProductDetail'
import Saved from './pages/frontpages/Saved'

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
      {/* Halaman Utama User / Landing Page */}
      <Route path="/" element={<Dashboard />} />

      {/* Halaman Fitur User */}
      <Route path="/jadwal" element={<Jadwal />} />
      <Route path="/saved" element={<Saved />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      </Route>

      {/* Halaman Login & Register */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin/login" element={<LoginPage />} />

      {/* Halaman Admin */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="add-service" element={<ProductForm />} />
      </Route>

        {/* Redirect jika route tidak ditemukan */}
        <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}