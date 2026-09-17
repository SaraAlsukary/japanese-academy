import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { ToastContainer } from 'react-toastify'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <ToastContainer position='top-center' className={'rtl'} />
    <QueryClientProvider client={queryClient}>

      <App />
    </QueryClientProvider>
  </StrictMode>,
)
