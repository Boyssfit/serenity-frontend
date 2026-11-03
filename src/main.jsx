import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import App from './App'
import { ProductProvider } from './utils/ProductContext'
import './index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ProductProvider>
          <App />
          <Toaster position="top-right" reverseOrder={false} />
        </ProductProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
)