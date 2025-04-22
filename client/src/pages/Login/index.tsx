import { Card, CardTitle, CardContent, CardHeader, CardDescription } from "@/components/ui/card"
import { LoginForm } from "@/components/LoginForm"
import { useAuth } from "@/context/AuthProvider"
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Command } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Login() {
	const navigate = useNavigate();
	const location = useLocation();
	const { isLogged } = useAuth();

	useEffect(() => {
		if (isLogged && location.pathname.includes("/login")) {
			navigate("/");
		}
	}, [isLogged])

	return (
		<div>
			<main role="main" className="w-full flex flex-col h-screen content-center justify-center">
				<div className="lg:w-1/4 rounded-xl m-auto">
					<div className="flex text-2xl font-medium justify-center items-center gap-2 pb-3">
						<Command />
						<h1>RPS</h1>
					</div>
					<Card>
						<CardHeader>
							<CardTitle>Sign In</CardTitle>
							<CardDescription>Make the sign in to enter in the system</CardDescription>
						<Separator className="mt-2" />
						</CardHeader>
						<CardContent>
							<LoginForm />
							<div className="text-center">
								<span>Don't have an account? <Link to="/register"><b>Sign up now</b></Link>.</span>
							</div>
						</CardContent>
					</Card>
				</div>
			</main>
		</div>
	)
}
