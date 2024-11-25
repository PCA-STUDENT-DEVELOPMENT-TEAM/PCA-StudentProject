import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayoutAdmin";
import BodyContentLayout from "@/Layouts/BodyContentLayout";
import { Head, usePage } from "@inertiajs/react";
import {
    ColumnDef,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal, View } from "lucide-react";
import Data from "@/Components/Constants/data6.json";
import { DataTable } from "@/Components/DataTable";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";

type columnTypes = {
    name: string;
    id: string;
    monthly_ammount: number;
    begin_balance: number;
    previous_paid: number;
    paid_amount: number;
};

const columns: ColumnDef<columnTypes>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "id", header: "Id Number" },
    { accessorKey: "monthly_amount", header: "Monthly Amount" },
    { accessorKey: "begin_balance", header: "Begin Balance" },
    { accessorKey: "previous_paid", header: "Previous Paid" },
    { accessorKey: "paid_amount", header: "Paid Amount" },
    {
        id: "actions",
        cell: ({ row }) => {
            const values = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <section>
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </section> 
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit Loan</DropdownMenuItem>
                        <DropdownMenuItem>
                            View Paid Amount Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>View Loan History</DropdownMenuItem>
                        <DropdownMenuItem>Reloan</DropdownMenuItem>
                        <DropdownMenuItem>Refresh</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export default function Loans() {
    const data: columnTypes[] = Data;

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 12,
            },
        },
    });
   return (
      <AuthenticatedLayoutAdmin
          header={<h2>{usePage().component.split("/")[1]}</h2>}
      >
          <Head title="Loans" />

          <BodyContentLayout headerName={"Loans"}>
              <div className="flex  mb-5 gap-3">
                  <Input
                      type="text"
                      placeholder="Search..."
                      className="w-1/4 rounded-[10px]"
                  />

                  <Button className="flex gap-1">
                      <View size={20} />
                      View Loan Types
                  </Button>
              </div>
              <div>
                  <DataTable
                      columns={columns}
                      table={table}
                      rowStyle="odd:bg-white even:bg-transparent text-center"
                  ></DataTable>
              </div>
          </BodyContentLayout>
      </AuthenticatedLayoutAdmin>
  );
}
