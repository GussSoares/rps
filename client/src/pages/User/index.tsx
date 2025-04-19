import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/hooks/use-user";

export function User() {
	const { user, loading, error } = useUser();

	if (error) return <div>Erro ao obter dados do usuário</div>

	return (
		<>
			<h1 className="text-xl font-semibold">USER</h1>

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
								user?.is_superuser
									? <Badge variant="default">superuser</Badge>
									: <Badge variant="default">default</Badge>
							}</p>
						</>
					)
			}
		</>
	)
}
