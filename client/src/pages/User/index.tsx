import { Breadcrumb } from "@/components/Breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { userRequest } from "@/services/auth";
import { useEffect, useState } from "react";

type User = {
	username: string;
	email: string;
	isSuperUser: boolean;
}

const mapUserData = (data: any) => {
	return {
		username: data.username,
		email: data.email,
		isSuperUser: data.is_superuser
	}
}

export function User() {
	const [user, setUser] = useState<User>();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		userRequest()
			.then(res => {
				setUser(mapUserData(res.data))
			})
			.catch(err => {
				console.log({err})
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	return (
		<>
			<Breadcrumb />
			<h1>USER</h1>

			{
				loading
					? (
						<div className="flex items-center space-x-4">
							<Skeleton className="h-12 w-12 rounded-full bg-emerald-300" />
							<div className="space-y-2">
								<Skeleton className="h-4 w-[250px] bg-emerald-300" />
								<Skeleton className="h-4 w-[200px] bg-emerald-300" />
							</div>
						</div>
					) : (
						<>
							<p>Name: {user?.username}</p>
							<p>Email: {user?.email}</p>
							<p>Role: {
								user?.isSuperUser
									? <Badge variant="default">superuser</Badge>
									: <Badge variant="default">default</Badge>
							}</p>
						</>
					)
			}


		</>
	)
}
