// import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoutes } from "@/protected-routes"
import { Dashboard, Login, Home, User, Register } from "./pages";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: ProtectedRoutes,
    children: [
      { index: true, Component: Home },
      { path: "dashboard", Component: Dashboard },
      { path: "user", Component: User}
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  // {
  //   path: "concerts",
  //   children: [
  //     { index: true, Component: ConcertsHome },
  //     { path: ":city", Component: ConcertsCity },
  //     { path: "trending", Component: ConcertsTrending },
  //   ],
  // },
]);



      