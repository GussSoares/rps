import moment from "moment";
import { flexRender, getCoreRowModel, getPaginationRowModel, PaginationState, RowSelectionState, SortingState, useReactTable } from "@tanstack/react-table"
import { DataTablePagination } from "../DataTablePagination"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useEffect, useState } from "react"
import { Checkbox } from "../ui/checkbox"
import { Badge } from "../ui/badge";
import { SortButtonTable } from "./sort-button-table";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { DialogActiveService } from "../dialogs/dialog-active-service";
import { useService } from "@/hooks/use-service";
import { Service } from "@/types/services";
import { toast } from "sonner";
import { listToPayFinances } from "@/services/finances";

export const ToPayTable = () => {
  const { updateService } = useService();
  const [selectedItem, setSelectedItem] = useState<Service>({ id: '', name: '', active: false });

  const [showModal, setShowModal] = useState<boolean>(false);
  const [data, setData] = useState([]);
  const [sorting, setSorting] = useState<SortingState>([{ id: 'service__name', desc: false }]);
  const [totalCount, setTotalCount] = useState(0);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })

  const table = useReactTable({
    data,
    columns: [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Selecionar tudo"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Selecionar linha"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: 'service.name',
        header: ({ column }) => <SortButtonTable column={column} columnName="Service" />,
        cell: props => {
          const data: any = props.row.original;
          return (
            <>
              <b>{props.getValue()}</b>
              <br />
              <span className="text-gray-500">{data.description}</span>
            </>
          )
        }
      },
      {
        accessorKey: 'client.name',
        header: ({ column }) => <SortButtonTable column={column} columnName="Client" />,
        cell: props => {
          const { client }: any = props.row.original;
          return (
            <>
              <b>{props.getValue()}</b>
              <br />
              <span className="text-gray-500">{client.phone}</span>
            </>
          )
        }
      },
      // {
      //   accessorKey: 'created_at',
      //   header: ({ column }) => <SortButtonTable column={column} columnName="Cadastrado em" />,
      //   cell: props => moment(props.getValue()).format('DD/MM/YYYY hh:mm')
      // },
      {
        accessorKey: 'due_date',
        header: ({ column }) => <SortButtonTable column={column} columnName="Vencimento" />,
        cell: props => moment(props.getValue()).format('DD/MM/YYYY')
      },
      {
        accessorKey: 'value',
        header: ({ column }) => <SortButtonTable column={column} columnName="Valor" />,
        cell: props => Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(props.getValue())
      },
      {
        accessorKey: 'paid_value',
        header: ({ column }) => <SortButtonTable column={column} columnName="Valor Pago" />,
        cell: props => Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(props.getValue())
      },
      {
        accessorKey: 'payment_status',
        header: ({ column }) => <SortButtonTable column={column} columnName="Status" />,
        cell: props => {
          switch (props.getValue()) {
            case 1: return <Badge className="bg-yellow-500">PENDENTE</Badge>
            case 2: return <Badge className="bg-green-500">PAGO</Badge>
            case 3: return <Badge className="bg-red-500">VENCIDO</Badge>
            case 4: return <Badge className="bg-gray-600">CANCELADO</Badge>
          }
        }
      },
      {
        accessorKey: 'actions',
        header: "Actions",
        cell: (props) => {
          const data: any = props.row.original;

          return (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0" title="Open actions">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {/* <DropdownMenuItem
                  onClick={() => navigator.clipboard.writeText(data.id)}
                >
                  Copy payment ID
                </DropdownMenuItem> */}
                  <DropdownMenuItem onClick={() => {
                    setSelectedItem(data)
                    setShowModal(true)
                  }}>{data.active ? "Inativar Serviço" : "Ativar Serviço"}</DropdownMenuItem>
                  {/* <DropdownMenuItem>View payment details</DropdownMenuItem> */}
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )
        }
      }
    ],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    manualPagination: true,
    pageCount: Math.ceil(totalCount / pagination.pageSize),
    state: {
      pagination,
      sorting,
      rowSelection
    }
  })

  const buildOrderBy = () => `${sorting[0].desc ? '-' : ''}${sorting[0].id}`;

  const getListToPayFinances = async () => {
    const _data = await listToPayFinances(pagination.pageIndex + 1, pagination.pageSize, buildOrderBy());
    setData(_data.results);
    setTotalCount(_data.total);
  };

  useEffect(() => {

    getListToPayFinances();
  }, [pagination, sorting]);

  return (
    <>
      <DialogActiveService open={showModal} onOpenChange={setShowModal} onConfirm={async () => {
        const updatedService = await updateService(selectedItem.id, { active: !selectedItem.active })
        await getListToPayFinances()
        setShowModal(false)
        toast.success('Success', {
          description: `${updatedService.name} foi ${updatedService.active ? 'ativado' : 'desativado'}`,
        })
      }} />
      <div className="rounded-md border mb-4">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </>
  )
}