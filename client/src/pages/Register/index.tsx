import { Card, CardTitle, CardContent, CardHeader, CardDescription } from "@/components/ui/card"
import { useAuth } from "@/context/AuthProvider"
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { RegisterForm } from "@/components/RegisterForm";

export function Register() {
	const navigate = useNavigate();
	const location = useLocation();
	const { isLogged } = useAuth();

	useEffect(() => {
		if (isLogged && location.pathname.includes("/login")) {
			navigate("/");
		}
	}, [isLogged])

	return (
		<div className="background-login">
			<main role="main" className="w-full flex flex-col h-screen content-center justify-center">
				<div className="lg:w-1/3 rounded-xl m-auto">
					<Card>
						<CardHeader>
							<CardTitle>Sign Up</CardTitle>
							<CardDescription>Make the login to enter in the system</CardDescription>
						</CardHeader>
						<CardContent>
							<RegisterForm />
							<div className="text-center">
								<span>Already have an account? <Link to="/login"><b>Sign in now</b></Link>.</span>
							</div>
						</CardContent>
					</Card>
				</div>
			</main>
		</div>
	)
}
