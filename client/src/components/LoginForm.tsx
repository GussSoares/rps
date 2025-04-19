import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form"
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Github, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthProvider";
import { PasswordInput } from "./ui/input-password";
import { Separator } from "./ui/separator";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
// import jwt_decode from "jwt-decode";

const loginSchema = z.object({
	username: z.string().min(7, "Must be greater 7 characters"),
	password: z.string(),
	age: z.coerce.number().gte(18, 'Must be greater 18 age').optional(),
});

type createUserFormData = z.infer<typeof loginSchema>

export function LoginForm() {
	const { login, loading, loginWithGoogle } = useAuth();
	const handlerLoginWithGoogle = useGoogleLogin({
		flow: "auth-code",
		onSuccess: tokenResponse => {
			loginWithGoogle(tokenResponse.code)
		},
		onError: () => {
			toast.error("Ocorreu um erro ao logar com o Google. Tente novamente");
		}
	});


	const form = useForm<createUserFormData>({
		resolver: zodResolver(loginSchema)
	});

	const loginHandler = async (formData: any) => {
		const result = loginSchema.safeParse(formData)

		if (result.success) {
			let { username, password } = result.data;

			await login(username, password)
		}
	}

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(loginHandler)}>
					<div className="grid w-full items-center gap-4">
						<div className="flex flex-col space-y-1.5">
							<FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Username</FormLabel>
										<FormControl>
											<Input type="text" placeholder="john.wick" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="flex flex-col space-y-1.5">
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<PasswordInput placeholder="*******" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="flex flex-col space-y-1.5">
							<Button disabled={loading} type="submit">
								{loading && <Loader2 className="animate-spin" />} Login
							</Button>
						</div>
						<div className="flex items-center gap-4">

							<Separator className="flex-1" />
							<span className="text-muted-foreground"> or continue with </span>
							<Separator className="flex-1" />
						</div>
						<div className="grid grid-cols-2 gap-2 pb-3">
							<Button onClick={() => handlerLoginWithGoogle()} type="button" variant="secondary" style={{cursor: "pointer"}}>
								<img src="https://developers.google.com/identity/images/g-logo.png" alt="google" style={{ width: 20, height: 20 }} />
								Google
							</Button>
							<Button disabled type="button" variant="secondary">
								<Github /> GitHub
							</Button>
						</div>
					</div>
				</form>
			</Form>
		</>
	)
}