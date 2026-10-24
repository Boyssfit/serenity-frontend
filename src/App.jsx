import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import AdminLayout from './layouts/AdminLayout'
import Dashboard from './pages/frontpages/Dashboard'
import ProductDetail from './pages/frontpages/ProductDetail'
import Saved from './pages/frontpages/Saved'
import Jadwal from './pages/frontpages/Jadwal'
import AdminDashboard from './pages/adminpages/AdminDashboard'
import LoginPage from './pages/adminpages/LoginPage'

export default function App() {
  return (
    <Routes>
      {/* Frontpage Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="saved" element={<Saved />} />
        <Route path="jadwal" element={<Jadwal />} />
      </Route>

      {/* Admin Auth Route */}
      <Route path="/admin/login" element={<LoginPage />} />

      {/* Admin Dashboard Protected Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
      </Route>
    </Routes>
  )
}