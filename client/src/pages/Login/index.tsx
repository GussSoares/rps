import "./Login.css"
import { Card, CardTitle, CardContent, CardHeader, CardDescription } from "@/components/ui/card"
import { LoginForm } from "@/components/LoginForm"
import { useAuth } from "@/context/AuthProvider"
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

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
		<div className="background-login w-full p-4">
			<main role="main" className="w-full flex flex-col h-screen content-center justify-center">
				<div className="w-full sm:w-1/2 lg:w-1/3 bg-gray-50 rounded-xl m-auto">
					<Card>
						<CardHeader>
							<CardTitle>Login</CardTitle>
							<CardDescription>Make the login to enter in the system</CardDescription>
						</CardHeader>
						<CardContent>
							<LoginForm />
						</CardContent>
					</Card>
				</div>
			</main>
		</div>
	)
}
