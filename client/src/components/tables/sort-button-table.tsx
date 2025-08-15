import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react"
import { Button } from "../ui/button"
import { Column } from "@tanstack/react-table"


type SortButtonTableType = {
  column: Column<never, any>;
  columnName: string;
}

export const SortButtonTable = ({ column, columnName }: SortButtonTableType) => {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {columnName}
      {
        column.getIsSorted()
          ? (
            column.getIsSorted() === 'asc'
              ? <ArrowUp className="ml-2 h-4 w-4" />
              : <ArrowDown className="ml-2 h-4 w-4" />
          )
          : <ArrowUpDown className="ml-2 h-4 w-4" />
      }
    </Button>
  )
}
