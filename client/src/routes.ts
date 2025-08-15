// import App from "./App";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoutes } from "@/protected-routes"
import { Dashboard, Login, Home, User, Register, Clients, Services, Administrator } from "./pages";
import { ListUser } from "./pages/User/List";
import { Profile } from "./pages/User/Profile";
import { Notifications } from "./pages/User/Notifications";
import { Finance } from "./pages/Finance";
import { ToPay } from "./pages/Finance/ToPay";
import { ToReceive } from "./pages/Finance/ToReceive";
import { RegisterClient } from "./pages/Clients/register-client";
import { ListClients } from "./pages/Clients/list-clients";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: ProtectedRoutes,
    children: [
      { index: true, Component: Home },
      { path: "dashboard", Component: Dashboard },
      {
        path: "user", Component: User, children: [
          { path: "profile", Component: Profile },
          { path: "notifications", Component: Notifications },
        ]
      },
      { path: "users", Component: ListUser },
      {
        path: "clients", Component: Clients, children: [
          { index: true, Component: ListClients },
          { path: "register", Component: RegisterClient },
        ]
      },
      { path: "services", Component: Services },
      { path: "administrator", Component: Administrator },
      {
        path: "finances", Component: Finance, children: [
          { path: "to-pay", Component: ToPay },
          { path: "to-receive", Component: ToReceive },
        ]
      },
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



