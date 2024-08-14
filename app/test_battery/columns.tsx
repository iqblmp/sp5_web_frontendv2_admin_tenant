"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { DataTableColumnHeader } from "./columnHeader"

export type Datas = {
  id: string
  battery_label: string
  lang_code: "english" | "indonesia"
}
export const columns: ColumnDef<Datas>[] = [
  {
    id: "index",
    header: "No.",
    cell: ({ row, table }) => (
      <div className="text-center">
        {(table
          .getSortedRowModel()
          ?.flatRows?.findIndex((flatRow) => flatRow.id === row.id) || 0) + 1}
        .
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
    size: 1,
  },
  {
    accessorKey: "battery_label",
    filterFn: "includesString",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="Battery Name"
          className="justify-center w-full"
        />
      )
    },
    size: 1000,
  },
  {
    accessorKey: "lang_code",
    filterFn: "includesString",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Language" />
    },
    size: 300,
  },

  {
    id: "actions",
    size: 200,
    header: "Action",
    cell: ({ row }) => {
      const payment = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
