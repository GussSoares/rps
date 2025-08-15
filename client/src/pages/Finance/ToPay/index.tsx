import { ToPayTable } from "@/components/tables/to-pay-table"
import { Separator } from "@/components/ui/separator"

export const ToPay = () => {
  return (
    <>
      <h1 className="text-3xl font-bold">Finances to Pay</h1>
      <span className="text-gray-500">See your bills to pay</span>
      <Separator className="my-5" />
      <div className="grid">
        <ToPayTable />
      </div>
    </>
  )
}