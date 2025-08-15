import { ServiceTable } from "@/components/tables/service-table"
import { Separator } from "@/components/ui/separator"

export const Services = () => {
  return (
    <>
      <h1 className="text-3xl font-bold">Services</h1>
      <span className="text-gray-500">List of all active clients</span>
      <Separator className="my-5" />
      <div className="grid">
        <ServiceTable />
      </div>
    </>
  )
}