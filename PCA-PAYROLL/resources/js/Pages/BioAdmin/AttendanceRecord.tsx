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
import { File, FolderUp, MoreHorizontal } from "lucide-react";
import Data from "@/Components/Constants/data5.json";
import { DataTable } from "@/Components/DataTable";
import { Input } from "@/Components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { DatePickerWithRange } from "@/Components/DateRangePicker";
import { addDays } from "date-fns";
import React from "react";
import { DateRange } from "react-day-picker";
import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";

//  Set accepted column types

type columnTypes = {
    name: string;
    rate: number;
    quantity: number;
    type: string;
    position: string;
    tardiness: number;
    compensation: number;
    deduction: number;
    gross_amount: number;
};

// Generate the headers for the columns
const columns: ColumnDef<columnTypes>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "rate", header: "Rate" },
    { accessorKey: "quantity", header: "Quantity" },
    { accessorKey: "type", header: "Type" },
    { accessorKey: "position", header: "Position" },
    { accessorKey: "tardiness", header: "Tardiness" },
    { accessorKey: "compensation", header: "Compensation" },
    { accessorKey: "deduction", header: "Deduction" },
    { accessorKey: "gross_amount", header: "Gross Amount" },
    {
        // Action button for table
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
                        <DropdownMenuItem>View Details</DropdownMenuItem>
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

export default function AttendanceRecord() {
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

    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 20),
    });
    return (
        <AuthenticatedLayoutAdmin
            header={<h2>{usePage().component.split("/")[1]}</h2>}
        >
            <Head title="AttendanceRecord" />

            <BodyContentLayout headerName={"Attendance Record"}>
                 <div className="flex mb-5 justify-between">
                    <section className="flex gap-5 w-full">
                    <div>
                            <DatePickerWithRange
                                className=""
                                date={date}
                                setDate={setDate}
                            ></DatePickerWithRange>
                    </div>
                    </section>
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
