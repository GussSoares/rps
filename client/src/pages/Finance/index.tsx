import { Separator } from "@/components/ui/separator"
import { Outlet, useLocation } from "react-router-dom"


export const Finance = () => {
  const location = useLocation()

  if (location.pathname !== '/finances') {
    return <Outlet />
  }

  return (
    <>
      <h1 className="text-3xl font-bold">Finances</h1>
      <span className="text-gray-500">See your finances informations</span>
      <Separator className="my-5" />
      <div className="grid">
        <Outlet />
      </div>
    </>
  )
}