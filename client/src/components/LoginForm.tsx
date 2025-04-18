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
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthProvider";
import { PasswordInput } from "./ui/input-password";

const loginSchema = z.object({
	username: z.string().min(7, "Must be greater 7 characters"),
	password: z.string(),
	age: z.coerce.number().gte(18, 'Must be greater 18 age').optional(),
});

type createUserFormData = z.infer<typeof loginSchema>

export function LoginForm() {
	const { login, loading } = useAuth();

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
											<Input type="text" placeholder="username" {...field} />
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
											<PasswordInput placeholder="password" {...field} />
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
					</div>
				</form>
			</Form>
		</>
	)
}