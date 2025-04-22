import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";


export function Home() {
	return (
		<>
			<h1>HOME</h1>
			<Button variant="ghost">
				<ChevronRight />
				<Link to="/dashboard" title="Dashboard">Dashboard</Link>
			</Button>
		</>
	)
}
