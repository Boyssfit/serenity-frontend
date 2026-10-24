import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email,
        password
      })

      localStorage.setItem('token', response.data.token)
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Kredensial yang diberikan tidak cocok.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
      <div>
        <Link to="/" className="text-2xl font-bold text-gray-900">
          Serenity SPA
        </Link>
      </div>

      <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
        {error && (
          <div className="mb-4 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div>
            <label className="block font-medium text-sm text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-xs mt-1 block w-full p-2 border"
            />
          </div>

          <div className="mt-4">
            <label className="block font-medium text-sm text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-xs mt-1 block w-full p-2 border"
            />
          </div>

          <div className="flex items-center justify-end mt-4">
            <button
              type="submit"
              disabled={loading}
              className="ml-3 inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none transition ease-in-out duration-150 disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Log in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}