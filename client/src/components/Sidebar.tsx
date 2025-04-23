import { ChartArea, Users2, LayoutGrid, ShieldBan, Wrench } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router-dom"
import { Separator } from "./ui/separator"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: LayoutGrid,
  },
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: ChartArea,
  },
  // {
  //   title: "Users",
  //   url: "/users",
  //   icon: Users2,
  // },
  {
    title: "Clients",
    url: "/clients",
    icon: Users2,
  },
  {
    title: "Services",
    url: "/services",
    icon: Wrench,
  },
  {
    title: "Administrator",
    url: "/administrator",
    icon: ShieldBan,
  },
  // {
  //   title: "Settings",
  //   url: "#",
  //   icon: Settings,
  // },
]

export function AppSidebar() {
  const location = useLocation()

  return (
    <Sidebar variant="floating">
      <SidebarHeader className="p-4 bg-white rounded-t-xl">
        <h1>RPS</h1>
        <Separator />
      </SidebarHeader>
      <SidebarContent className="bg-white rounded-b-xl">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={item.url === location.pathname}>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
