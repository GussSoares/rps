import "./Form.css"
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form"
import { toast, Toaster } from "sonner";

const createUserFormSchema = z.object({
	username: z.string().min(7, "Must be greater 7 characters"),
	email: z.string().email(),
	age: z.coerce.number().gte(18, 'Must be greater 18 age').optional(),
});

type createUserFormData = z.infer<typeof createUserFormSchema>


export function FormComponent() {
	const form = useForm<createUserFormData>({
		resolver: zodResolver(createUserFormSchema)
	});

	const onSubmit = (formData: any) => {
		const result = createUserFormSchema.safeParse(formData);

		if (result.success) {
			console.log(result.data);
			toast.success("Success", {
				description: "user created!",
				richColors: true,
				action: {
					label: "teste",
					onClick: () => {
						console.log('toast clicked')
					}
				}
			})

		} else {
			console.log(result)
		}
	}

	return (
		<>
			<Toaster />
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<div className="grid grid-cols-3">

						<div className="">
							<FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormItem>
										<FormLabel>UserName</FormLabel>
										<FormControl>
											<Input type="text" placeholder="Name" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input type="email" placeholder="Email" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="">
							<FormField
								control={form.control}
								name="age"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Age</FormLabel>
										<FormControl>
											<Input type="number" placeholder="Age" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>

					<Button variant={"default"} className="bg-green-800" type="submit">
						Submit
					</Button>
				</form>
			</Form>
		</>
	)
}
