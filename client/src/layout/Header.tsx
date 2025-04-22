import { useAuth } from "@/context/AuthProvider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu } from "@radix-ui/react-dropdown-menu"
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, LogIn, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DropdownNotifications } from "@/components/dropdowns/dropdown-notifications";


export const Header = (props: React.HTMLAttributes<HTMLElement>) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const localLogout = () => {
    logout();
    navigate("/login")
  }

  return (
    <header className="top-0 left-0 w-full py-4 px-4 z-50 flex justify-between items-center" {...props}>

      <div className="flex gap-5">
        <Button variant="outline" asChild style={{ cursor: "pointer" }}>
          <SidebarTrigger />
        </Button>
        <div>
          <Separator className="" orientation="vertical" />
        </div>
      </div>

      <h1 className="text-xl font-semibold">Minha Aplicação</h1>
      <div className="flex gap-5">
        <DropdownNotifications />
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
            <DropdownMenuItem onClick={() => navigate('/user/profile')}>
              <User /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => localLogout()} className="text-destructive">
              <LogOut color="red" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
