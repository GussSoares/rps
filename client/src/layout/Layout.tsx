// app/layout.tsx ou AppLayout.tsx

import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";

type LayoutProps = {
	children?: ReactNode;
};

export default function AppLayout({ children }: LayoutProps) {
	return (
		<SidebarProvider>
				<AppSidebar />
			<div className="w-full">
				<Header />
				<main className="min-h-screen px-6 py-4 bg-gray-50 pb-20">
					{children}
				</main>
				<Footer />
			</div>
		</SidebarProvider>
	);
}