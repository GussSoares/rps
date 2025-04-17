import './index.css'
// import React from 'react';
import { createRoot } from 'react-dom/client'
import { UserProvider } from './context/AuthProvider.tsx'
import { RouterProvider } from "react-router-dom";
import { Toaster } from '@/components/ui/sonner.tsx'
import { router } from './routes.ts';


createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <UserProvider>
    <RouterProvider router={router} />
    <Toaster />
  </UserProvider>
  // </React.StrictMode>
)
