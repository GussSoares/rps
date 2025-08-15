import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UserPlus2 } from "lucide-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export const Clients = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <>
      <h1 className="text-3xl font-bold">Clients</h1>
      <div className="flex justify-between items-center w-full mt-2">
        <span className="text-gray-500">List of all active clients</span>
        {
          location.pathname === '/clients'
            ? (
              <Button onClick={() => navigate('/clients/register')}>
                <UserPlus2 />
                Cadastrar Cliente
              </Button>
            )
            : ''
        }

      </div>
      <Separator className="my-5" />
      <div className="grid">
        <Outlet />
      </div>
    </>
  )
}