import './App.css'
import AppLayout from './layout/Layout'
import { Outlet } from 'react-router-dom'

const App = (props: React.HtmlHTMLAttributes<HTMLElement>) => {
  return (
    <AppLayout {...props}>
      <Outlet />
    </AppLayout>
  )
}

export default App;
