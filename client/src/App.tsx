import './App.css'
import { Login } from './pages/Login'
import { useAuth } from './context/AuthProvider'
import { Home } from './pages/Home'
import AppLayout from './components/Layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
// import MainRoutes from './routes'

function App() {
  const { isLogged } = useAuth();

  if (!isLogged()) return <Login />

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<AppLayout />}>
        <Route path='/home' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Route>
      <Route element={<Login />} path='/login' />
    </Routes>
     
    </BrowserRouter>
    </>
  )
}

export default App;
