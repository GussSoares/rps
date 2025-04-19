import { useAuth } from "@/context/AuthProvider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu } from "@radix-ui/react-dropdown-menu"
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";


export const Header = (props: React.HTMLAttributes<HTMLElement>) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const localLogout = () => {
    logout();
    navigate("/login")
  }

  return (
    // bg-blue-600 text-white p-4
    // <header className="bg-gray-300 top-0 left-0 w-full shadow-md py-4 px-6 z-50 flex justify-between items-center" {...props}>
    <header className="top-0 left-0 w-full py-4 px-4 z-50 flex justify-between items-center" {...props}>
      <Button variant="outline" asChild style={{cursor: "pointer"}}>
        <SidebarTrigger />
      </Button>

      <h1 className="text-xl font-semibold">Minha Aplicação</h1>
      <DropdownMenu>
        <DropdownMenuTrigger style={{ cursor: 'pointer' }}>
          <div className="flex space-x-2 items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="text-start">
              <p className="text-sm font-medium">{user?.first_name + ' ' + user?.last_name}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>

        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            My Account
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User />
            <Link to="/user">
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => localLogout()} className="text-destructive">
            <LogOut color="red" /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
