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
    { accessorKey: "no.", header: "No." },
    { accessorKey: "rate", header: "Name" },
    { accessorKey: "quantity", header: "Employee ID" },
    { accessorKey: "type", header: "Job Title" },
    { accessorKey: "position", header: "Date" },
    { accessorKey: "tardiness", header: "Day" },
    { accessorKey: "compensation", header: "Time-In" },
    { accessorKey: "deduction", header: "Time-Out" },
    
];

export default function AttendanceList() {
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
            <Head title="Employee Attendance List" />

            <BodyContentLayout headerName={"Employee Attendance List"}>

                
                <div className="flex  mb-5 justify-between">
                    <section className="flex gap-5 w-full">
                    <div>
                            <DatePickerWithRange
                                className=""
                                date={date}
                                setDate={setDate}
                            ></DatePickerWithRange>
                    </div>
                    
                    <Dialog>
                            <DialogTrigger>
                                <section className="flex gap-1 bg-secondaryGreen text-white items-center justify-center p-2 rounded-[10px] pl-3 pr-3">
                                    View List
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
                
                <div className="flex mb-5 justify-between">
                    <section className="flex gap-7 w-full justify-left">
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
                    <section className="flex gap-7 w-full justify-end">
                        <Input
                            type="text"
                            placeholder="Search..."
                            className="w-1/2 rounded-[10px]"
                        />
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
