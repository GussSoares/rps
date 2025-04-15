// import App from "./App";
import { createBrowserRouter } from "react-router";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages";
import { Home } from "./pages/Home";
import { ProtectedRoutes } from "@/routes.tsx"


export const router = createBrowserRouter([
  {
    path: "/",
    Component: ProtectedRoutes,
    children: [
      { index: true, Component: Home },
      { path: "dashboard", Component: Dashboard },
    ],
  },
  {
    path: "/login",
    Component: Login,
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



      