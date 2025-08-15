import { Component } from "@/components/dashboard/donut-shart"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ChevronLeft, DollarSign } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


export const Dashboard = () => {
	const [loading, setLoading] = useState(true);
	const items = [
		{ title: 'Total Revenue', value: '45.231,89' },
		{ title: 'Total Revenue', value: '45.231,89' },
		{ title: 'Total Revenue', value: '45.231,89' },
		{ title: 'Total Revenue', value: '45.231,89' },
	];

	useEffect(() => {
		setTimeout(() => {
			setLoading(false)
		}, 3000)
	}, [])

	return (
		<>
			<h1>Dashboard</h1>
			<Button variant="ghost">
				<ChevronLeft />
				<Link to="/" title="Home">Home</Link>
			</Button>

			<div className="grid grid-cols-4 gap-3 pt-5">

				{items.map((item) => {
					return (
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center">
									<div className="flex-1 text-sm font-medium">
										Total Revenue
									</div>
									<div>
										<DollarSign size="15" color="gray" />
									</div>
								</CardTitle>
								<div className="pt-5">
									<h1 className="text-2xl font-bold">

										{
											loading
												? <Skeleton className="h-8 w-5/12 rounded-full" />
												: `$ ${item.value}`
										}
									</h1>
								</div>
								<CardContent>
								</CardContent>
							</CardHeader>
						</Card>
					)
				})}
			</div>
			<div className="grid grid-cols-2 gap-3 pt-3">
				<Component />
			</div>
		</>
	)
}
