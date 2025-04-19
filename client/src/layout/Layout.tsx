// app/layout.tsx ou AppLayout.tsx

import { ReactNode } from "react";
import { Header } from "./Header";
// import { Footer } from "./Footer";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Card, CardContent } from "@/components/ui/card";

type LayoutProps = {
	children?: ReactNode;
};

export default function AppLayout({ children }: LayoutProps) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<div className="flex flex-col h-screen w-screen">
				<Header />
				<Breadcrumb className="px-6 py-2" />
				<main className="flex-1 px-2 py-2">
					<Card className="flex flex-col h-full">
						<CardContent className="flex-1 overflow-auto">
							{children}
						</CardContent>
					</Card>
				</main>
				{/* <Footer /> */}
			</div>
		</SidebarProvider>
	);
}