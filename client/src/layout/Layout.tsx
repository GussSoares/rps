// app/layout.tsx ou AppLayout.tsx

import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type LayoutProps = {
	children?: ReactNode;
};

export default function AppLayout({ children }: LayoutProps) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<div className="flex flex-col h-screen w-screen">
				<Header />
				<main className="flex-1 px-4 py-4 bg-gray-50">
					<Card className="flex flex-col h-full">
						<CardHeader>
							<Breadcrumb />
						</CardHeader>
						<CardContent className="flex-1 overflow-auto">
							{children}
						</CardContent>
					</Card>
				</main>
				<Footer />
			</div>
		</SidebarProvider>
	);
}