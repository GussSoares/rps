import { useAuth } from "@/context/AuthProvider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu } from "@radix-ui/react-dropdown-menu"
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const localLogout = () => {
    logout();
    navigate("/login")
  }
  return (
    <header className="bg-gray-300 fixed top-0 left-0 w-full shadow-md py-4 px-6 z-50 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Minha Aplicação</h1>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar style={{ cursor: 'pointer' }}>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <Link to="/user">My Account</Link>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => localLogout()}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
