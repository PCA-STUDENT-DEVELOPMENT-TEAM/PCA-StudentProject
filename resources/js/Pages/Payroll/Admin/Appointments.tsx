import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayout";
import BodyContentLayout from "@/Layouts/BodyContentLayout";
import { Head, usePage } from "@inertiajs/react";
import {
    ColumnDef,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal, Plus, View } from "lucide-react";
import Data from "@/Components/Constants/data10.json";
import { DataTable } from "@/Components/DataTable";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { AdminLinks } from "@/lib/payrollLinks";

type columnTypes = {
    type: string;
    mandatory_deduction: boolean;
    basic_pay: number;
    compensation: number;
    tax: number;
    deduction: number;
};

const columns: ColumnDef<columnTypes>[] = [
    { accessorKey: "type", header: "Type" },
    { accessorKey: "mandatory_deduction", header: "Mandatory Deduction" },
    { accessorKey: "basic_pay", header: "Basic Pay" },
    { accessorKey: "compensation", header: "Compensation" },
    { accessorKey: "tax", header: "Tax" },
    { accessorKey: "deduction", header: "Deduction" },
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
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export default function Appointments() {
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
        <AuthenticatedLayoutAdmin title="Appointments" links={AdminLinks}>
            <BodyContentLayout headerName={"Appointments List"}>
                <div className="flex  mb-5 gap-3">
                    <Input
                        type="text"
                        placeholder="Search..."
                        className="w-1/4 rounded-[10px]"
                    />

                    <Button className="flex gap-1">
                        <Plus size={20} />
                        Add New Appointment Profile
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
