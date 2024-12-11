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
    { accessorKey: "gross_amount", header: "No." },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "rate", header: "AM Arrival" },
    { accessorKey: "quantity", header: "AM Departure" },
    { accessorKey: "type", header: "PM Arrival" },
    { accessorKey: "position", header: "PM Departure" },
    { accessorKey: "tardiness", header: "Tardiness" },
    { accessorKey: "compensation", header: "Undertime" },
    { accessorKey: "deduction", header: "Date" },
   
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

            <BodyContentLayout headerName={"Employee Attendance Record"}>
            <div className="flex items-center justify-center h-full">
                <BodyContentLayout headerName="Employee Informations" className="mt-5  h-fit shadow-md lg:w-2/4">
                
                </BodyContentLayout>
            </div>

                
            <div className="flex mb-5 justify-between">
                    <section className="flex gap-7 mt-5 w-full justify-right">
                    <section className="flex gap-7 w-1/4 justify-left">

                        <Input
                            type="text"
                            placeholder="Search Employee..."
                            className=" rounded-[10px]"
                        />
                        </section>
                        <div>
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Show Entries" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="flexi">Dark</SelectItem>
                                    <SelectItem value="regular">
                                        Regular
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <Dialog>
                            <DialogTrigger>
                                <section className="flex gap-1 bg-baseYellow text-black items-center justify-center p-2 rounded-[10px] pl-3 pr-5">
                                    <File size={15} />
                                    Generate Report
                                </section>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Feature Under Development
                                    </DialogTitle>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
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
