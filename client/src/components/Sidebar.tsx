import { ChartArea, Users2, LayoutGrid, ShieldBan, Wrench, DollarSign, BanknoteArrowUp, BanknoteArrowDown, ChevronRight } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarRail
} from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router-dom"
import { Separator } from "./ui/separator"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"

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
    title: "Finances",
    url: "/finances",
    icon: DollarSign,
    children: [
      {
        title: "To Pay",
        url: "/finances/to-pay",
        icon: BanknoteArrowUp,
      },
      {
        title: "To Receive",
        url: "/finances/to-receive",
        icon: BanknoteArrowDown,
      }
    ]
  },
  {
    title: "Administrator",
    url: "/administrator",
    icon: ShieldBan,
  },
]

export function AppSidebar() {
  const location = useLocation()

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader className="p-4 bg-white rounded-t-xl">
        <h1>RPS</h1>
        <Separator />
      </SidebarHeader>
      <SidebarContent className="bg-white rounded-b-xl">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(item => (
                item.children
                  ? (
                    <Collapsible defaultOpen className="group/collapsible">
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton isActive={item.url === location.pathname}>
                            <item.icon />
                            <span>{item.title}</span>
                            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {
                              item.children.map((subItem) => (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton asChild isActive={subItem.url === location.pathname}>
                                    <Link to={subItem.url}>
                                      <subItem.icon />
                                      <span>{subItem.title}</span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))
                            }
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ) : (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={item.url === location.pathname}>
                        <Link to={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar >
  )
}
