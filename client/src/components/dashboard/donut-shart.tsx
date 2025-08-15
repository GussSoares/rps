"use client"

import * as React from "react"
import { Loader2, TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { getToPayCountByService } from "@/services/finances"


export function Component() {
  const [chartData, setChartData] = React.useState()
  const [chartTotal, setChartTotal] = React.useState(0)
  const [chartConfig, setChartConfig] = React.useState<ChartConfig>({});
  const [loading, setLoading] = React.useState(true);

  // const totalVisitors = React.useMemo(() => {
  //   return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  // }, [])

  React.useEffect(() => {
    const fetchData = async () => {
      let config = {}
      const { items, total } = await getToPayCountByService();

      const _items = items.map((item: Object, index: number) => {
        config[item.label] = { label: item.label, color: `hsl(var(--chart-${index + 1}))` }

        return { label: item.label, value: Number(item.value), fill: `var(--chart-${index + 1})` }
      })

      // items.map((item: any, index: number) => {
      //   config[item.label] = { label: item.label, color: `hsl(var(--chart-${index + 1}))` }
      // })

      setChartConfig(config);
      setChartData(_items);
      setChartTotal(Number(total));
      setLoading(false);
    }
    fetchData()
  }, [])

  return (
    loading
      ? <Loader2 className="animate-spin" />
      : (
        <Card className="flex flex-col">
          <CardHeader className="items-center pb-0">
            <CardTitle>Pie Chart - Donut with Text</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="label"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {/* {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(chartTotal)} */}
                              {chartTotal}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Services
                            </tspan>
                          </text>
                        )
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>
      )


  )
}
