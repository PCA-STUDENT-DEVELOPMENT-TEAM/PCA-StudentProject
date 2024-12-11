import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayoutBioAdmin";
import { Head, usePage } from "@inertiajs/react";
import StatusCardb from "@/Components/StatusCardb";
import {
    Users,
    Banknote,
    CreditCard,
    MoreHorizontal,
    PhilippinePeso,
    TrendingDown,
    Loader,
    User,
    Clock,
    ClockAlert,
} from "lucide-react";
import BodyContentLayout from "@/Layouts/BodyContentLayout";
import {
    ColumnDef,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
    
} from "@tanstack/react-table";
import { DataTable } from "@/Components/DataTable";
import { DatePickerWithRange } from "@/Components/DateRangePicker";

import payrollData from "@/Components/Constants/data3.json";
import loanData from "@/Components/Constants/data4.json";
import React from "react";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import Dashboardb from './Dashboard';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

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




    export default function dashboardb() {
        const { allData } = usePage<{ allData: columntTypes[] }>().props
        

        const table = useReactTable({
            data: allData,
            columns,
            getCoreRowModel: getCoreRowModel(),
            getPaginationRowModel: getPaginationRowModel(),
            initialState: {
                pagination: {
                    pageSize: 5,
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
            <Head title="Dashboard" />

            <div className="lg:bg-white lg:shadow-md w-full h-full rounded-[10px] overflow-x-auto lg:block lg:overflow-hidden">
                <div className="flex gap-5 justify-between py-2 sm:p-5">
                    <StatusCardb
                        cardQuantity={102}
                        cardTitle="Total Employees"
                        Icon={Users}
                    />
                    <StatusCardb
                        cardQuantity={0}
                        cardTitle="Total Absent"
                        Icon={Users}
                    />
                    <StatusCardb
                        cardQuantity={0}
                        cardTitle="On time Today"
                        Icon={Clock}
                    />
                   
                </div>
                <div className="flex gap-5 justify-between py-2 sm:p-5">
                    {/* Status Card Props need Backend Data Retrieval */}
                    {/* Need pag adjustments sa design*/}
                    <StatusCardb
                        cardQuantity={0}
                        cardTitle="Total Late"
                        Icon={ClockAlert}
                    />
                    <StatusCardb
                        cardQuantity={0}
                        cardTitle="Total On Leave"
                        Icon={User}
                    />
                    <StatusCardb
                        cardQuantity={0}
                        cardTitle="Pending Application"
                        Icon={Loader}
                    />
                   
                </div>
               
            </div>


            <div className="lg:flex gap-5">
                <div className="lg:w-full h-full">
                    <div>
                        <BodyContentLayout
                            headerName="Recent Attendance List"
                            className=" mt-5 h-fit shadow-md"
                        >
                            <DataTable
                                columns={columns}
                                rowStyle="odd:bg-white even:bg-transparent text-center"
                                table={table}
                                className="lg:h-[450px]"
                            />
                        </BodyContentLayout>
                    </div>
                </div>
            </div>
        </AuthenticatedLayoutAdmin>
    );
}
