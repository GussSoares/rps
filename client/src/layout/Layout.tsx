// app/layout.tsx ou AppLayout.tsx

import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

type LayoutProps = {
	children?: ReactNode;
};

export default function AppLayout({ children }: LayoutProps) {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="min-h-screen px-6 py-4 bg-gray-50 pb-20" style={{paddingTop: '5em'}}>
				{children}
			</main>
			<Footer />
		</div>
	);
}