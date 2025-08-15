import './index.css'
// import React from 'react';
import { createRoot } from 'react-dom/client'
import { UserProvider } from './context/AuthProvider.tsx'
import { RouterProvider } from "react-router-dom";
import { Toaster } from '@/components/ui/sonner.tsx'
import { router } from './routes.ts';
import { GoogleOAuthProvider } from "@react-oauth/google";

const googleCLientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <GoogleOAuthProvider clientId={googleCLientId}>
    <UserProvider>
      <RouterProvider router={router} />
      <Toaster position='top-right' richColors />
    </UserProvider>
  </GoogleOAuthProvider>
  // </React.StrictMode>
)
