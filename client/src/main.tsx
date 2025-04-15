import './index.css'
import { createRoot } from 'react-dom/client'
import { UserProvider } from './context/AuthProvider.tsx'
import { Toaster } from 'sonner'
import App from './App.tsx'


createRoot(document.getElementById('root')!).render(
  <>
    <UserProvider>
      <Toaster />
      <App />
    </UserProvider>
  </>
)
