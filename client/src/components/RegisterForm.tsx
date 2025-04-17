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
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";


const genderChoices = [
	{ label: "Male", value: "M" },
	{ label: "Female", value: "F" },
];

const registerSchema = z.object({
	firstname: z.string(),
	lastname: z.string(),
	username: z.string().min(7, "Must be greater 7 characters"),
	gender: z.enum(genderChoices.map(value => value.value) as [string]),
	email: z.string().email(),
	password: z.string(),
	confirmPassword: z.string(),
}).superRefine(({ password, confirmPassword }, ctx) => {
	if (password !== confirmPassword) {
		ctx.addIssue({
			code: "custom",
			message: "The passwords did not match",
			path: ['confirmPassword']
		})
	}
});

type registerUserFormData = z.infer<typeof registerSchema>

export function RegisterForm() {
	const { login, loading } = useAuth();

	const form = useForm<registerUserFormData>({
		resolver: zodResolver(registerSchema)
	});

	const loginHandler = (formData: any) => {
		const result = registerSchema.safeParse(formData)

		if (result.success) {
			let { username, password } = result.data;

			login(username, password)
		}
	}

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(loginHandler)}>
					<div className="grid grid-cols-2 w-full gap-4">
						{/* Firstname */}
						<div className="space-y-1.5">
							<FormField
								control={form.control}
								name="firstname"
								render={({ field }) => (
									<FormItem>
										<FormLabel>First name</FormLabel>
										<FormControl>
											<Input type="text" placeholder="Name" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						{/* Lastname */}
						<div className="space-y-1.5">
							<FormField
								control={form.control}
								name="lastname"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Last name</FormLabel>
										<FormControl>
											<Input type="text" placeholder="Surname" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						{/* email */}
						<div className="col-span-2 space-y-1.5">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input type="text" placeholder="email" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						{/* username */}
						<div className="space-y-1.5">
							<FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Username</FormLabel>
										<FormControl>
											<Input type="text" placeholder="Name" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						{/* gender */}
						<div className="space-y-1.5">
							<FormField
								control={form.control}
								name="gender"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Gender</FormLabel>
										<Select onValueChange={field.onChange} defaultValue={field.value}>
											<FormControl>
												<SelectTrigger className="w-full">
													<SelectValue placeholder="Select a gender" />
												</SelectTrigger>
											</FormControl>

											<SelectContent>
												<SelectGroup>
													{genderChoices.map((option) => (
														<SelectItem key={option.value} value={option.value}>
															{option.label}
														</SelectItem>
													))}
												</SelectGroup>
											</SelectContent>
											{/* <Input type="text" placeholder="gender" {...field} /> */}
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						{/* password */}
						<div className="space-y-1.5">
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<PasswordInput placeholder="Password" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						{/* confirm password */}
						<div className="space-y-1.5">
							<FormField
								control={form.control}
								name="confirmPassword"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Confirm password</FormLabel>
										<FormControl>
											<PasswordInput placeholder="Confirm password" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="col-span-2 space-y-1.5">
							<Button className=""  disabled={loading} type="submit">
								{loading && <Loader2 className="animate-spin" />} Login
							</Button>
						</div>
					</div>
				</form>
			</Form>
		</>
	)
}