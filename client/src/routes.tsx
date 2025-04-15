import { Login } from "@/pages/Login";
import { Home } from "@/pages/Home";
import { Route, Routes } from "react-router-dom";


const MainRoutes = () => {
  return (
    <Routes>
      <Route element={<Home/>} path="/" />
      <Route element={<Login/>} path="/login" />
    </Routes>
  )
}

export default MainRoutes;