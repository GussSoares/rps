import './App.css'
import AppLayout from './layout/Layout'
import { Outlet } from 'react-router'

function App() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  )
}

export default App;
