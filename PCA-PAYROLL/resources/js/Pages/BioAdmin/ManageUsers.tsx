import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayoutBioAdmin";
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
  { accessorKey: "EmployeeID", header: "EmployeeID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "job_title", header: "Job Title" },
  { accessorKey: "mobile_num", header: "Mobile Number" },
  { accessorKey: "status", header: "Status" },
  
];

export default function ManageUsers() {
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
          <Head title="Manage Users" />

          <BodyContentLayout headerName={"Manage Users"}>
              <div className="flex  mb-5 gap-3">
                  <Input
                      type="text"
                      placeholder="Search..."
                      className="w-1/4 rounded-[10px] ml-auto"
                  />

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
