import { Separator } from "@/components/ui/separator";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { User2, MessageSquareDot } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";

export function User() {
	const location = useLocation()
	const tabs = [
		{ title: "Profile", value: "profile", path: "profile", icon: <User2 /> },
		{ title: "Notifications", value: "notifications", path: "notifications", icon: <MessageSquareDot /> },
	]

	return (
		<>
			<h1 className="text-3xl font-bold">User</h1>
			<span className="text-gray-500">Set your user informations</span>
			<Separator className="my-5" />
			<div className="grid grid-cols-6">
				<aside>
					<SidebarMenu>
						{
							tabs.map((item) => {
								return (
									<SidebarMenuItem key={item.value}>
										<SidebarMenuButton className="py-6" asChild isActive={location.pathname.includes(item.path)}>
											<Link to={item.path}>{item.icon} {item.title}</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								)
							})
						}

					</SidebarMenu>
				</aside>
				<div className="col-span-5 pl-5">
					<Outlet />
				</div>
			</div>
		</>
	)
}
