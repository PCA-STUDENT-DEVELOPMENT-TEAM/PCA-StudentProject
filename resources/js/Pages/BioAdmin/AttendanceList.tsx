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
    getFilteredRowModel,
} from "@tanstack/react-table";
import { File, FolderUp, MoreHorizontal } from "lucide-react";
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
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import Employees from "../Payroll/Admin/Employees";

//  Set accepted column types

// import { useState } from "react";
// import { usePage } from "@inertiajs/react";
// import { Input } from "@/Components/ui/input";
// import { DataTable } from "@/Components/DataTable";
// import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayoutBioAdmin";
// import BodyContentLayout from "@/Layouts/BodyContentLayout";
// import { Head } from "@inertiajs/react";
// import { ColumnDef, useReactTable, getCoreRowModel, getPaginationRowModel } from "@tanstack/react-table";

type ColumnType = {
    date: string;
    time_in_am: string;
    time_out_am: string;
    time_in_pm: string;
    time_out_pm: string;
    tardy_minutes: number;
    undertime_minutes: number;
    work_minutes: number;
    employee_code: number;
};

// Generate the headers for the columns
const columns: ColumnDef<ColumnType>[] = [
    { accessorKey: "date", header: "Date" },
    { accessorKey: "time_in_am", header: "AM Time in" },
    { accessorKey: "time_out_am", header: "AM Time out" },
    { accessorKey: "time_in_pm", header: "PM Time in" },
    { accessorKey: "time_out_pm", header: "AM Time out" },
    { accessorKey: "tardy_minutes", header: "Tardy Minutes" },
    { accessorKey: "undertime_minutes", header: "Undertime" },
    { accessorKey: "work_minutes", header: "Work Time" },
    { accessorKey: "employee_code", header: "Employee ID" },

];

export default function ShowAttendance() {
    const { allData } = usePage<{ allData: columntTypes[] }>().props
    const [globalFilter, setGlobalFilter] = useState<any>([]);
    

    const table = useReactTable({
        data: allData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 12,
            },
        },
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: "auto",
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
    });


    const [date, setDate] = useState<DateRange | undefined>
    ({
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
                            onChange={(e) =>
                                setGlobalFilter(e.target.value || "")
                            }
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
