import './index.css'
import { createRoot } from 'react-dom/client'
import { UserProvider } from './context/AuthProvider.tsx'
import { RouterProvider } from "react-router";
import { Toaster } from 'sonner'
import { router } from './routes.ts';


createRoot(document.getElementById('root')!).render(
  <UserProvider>
    <RouterProvider router={router} />
    <Toaster />
  </UserProvider>
)
