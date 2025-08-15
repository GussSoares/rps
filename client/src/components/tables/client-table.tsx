import moment from "moment";
import { flexRender, getCoreRowModel, getPaginationRowModel, PaginationState, RowSelectionState, SortingState, useReactTable } from "@tanstack/react-table"
import { DataTablePagination } from "../DataTablePagination"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { useEffect, useState } from "react"
import { listClients, updateClient } from "@/services/clients"
import { Checkbox } from "../ui/checkbox"
import { SortButtonTable } from "./sort-button-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { DialogActiveService } from "../dialogs/dialog-active-service";
import { toast } from "sonner";
import { Clients } from "@/types/clients";
import { Badge } from "../ui/badge";

export const ClientTable = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Clients>();
  const [data, setData] = useState([]);
  const [sorting, setSorting] = useState<SortingState>([{ id: 'name', desc: false }]);
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
        accessorKey: 'name',
        header: ({ column }) => <SortButtonTable column={column} columnName="Name" />
      },
      {
        accessorKey: 'email',
        header: ({ column }) => <SortButtonTable column={column} columnName="Email" />
      },
      {
        accessorKey: 'phone',
        header: ({ column }) => <SortButtonTable column={column} columnName="Phone" />
      },
      {
        accessorKey: 'created_at',
        header: ({ column }) => <SortButtonTable column={column} columnName="Cadastrado em" />,
        cell: props => moment(props.getValue()).format('DD/MM/YYYY hh:mm')
      },
      {
        accessorKey: 'active',
        header: ({ column }) => <SortButtonTable column={column} columnName="Status" />,
        cell: props => (
          props.getValue() === true
            ? <Badge className="bg-green-500">Ativo</Badge>
            : <Badge className="bg-red-500">Inativo</Badge>
        )
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
                  }}>{data.active ? "Inativar Cliente" : "Ativar Cliente"}</DropdownMenuItem>
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

  const buildOrderBy = () => {
    return `${sorting[0].desc ? '-' : ''}${sorting[0].id}`
  };

  const getListClients = async () => {
    const _data = await listClients(pagination.pageIndex + 1, pagination.pageSize, buildOrderBy());
    setData(_data.results);
    setTotalCount(_data.total);
  }

  useEffect(() => {
    getListClients();
  }, [pagination, sorting]);

  return (
    <>
      <DialogActiveService open={showModal} onOpenChange={setShowModal} onConfirm={async () => {
        if (selectedItem) {
          const updatedService = await updateClient(selectedItem.id, { active: !selectedItem.active })
          await getListClients()
          setShowModal(false)
          toast.success('Success', {
            description: `${updatedService.name} foi ${updatedService.active ? 'ativado' : 'desativado'}`,
          })
        }
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