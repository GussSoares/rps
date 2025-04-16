import { Breadcrumb } from "@/components/Breadcrumb"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { Link } from "react-router-dom"


export const Dashboard = () => {
	return (
		<>
			<Breadcrumb />
			<h1>Dashboard</h1>
			<Button variant="ghost">
				<ChevronLeft />
				<Link to="/" title="Home">Home</Link>
			</Button>
		</>
	)
}
