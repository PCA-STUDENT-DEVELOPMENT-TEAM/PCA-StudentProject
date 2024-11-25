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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
type recentPayrolls = {
    period: string;
    name: string;
    employee_id: string;
    position: string;
    deduction: number;
    compensation: number;
};

type recentRequest = {
    id: number;
    name: string;
    loan_details: string;
};

// Column definition for Recent Payroll Table
const rpcolumns: ColumnDef<recentPayrolls>[] = [
    {
        accessorKey: "period",
        header: "Period",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "employee_id",
        header: "Employee Id",
    },
    {
        accessorKey: "position",
        header: "Position",
    },

    {
        accessorKey: "deduction",
        header: "Deduction",
    },
    {
        accessorKey: "compensation",
        header: "Compensation",
    },

];

const rlcolumns: ColumnDef<recentRequest>[] = [
    { accessorKey: "id", header: "No." },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "loan_details", header: "Loan Details" },
    {
        id: "actions",
        cell: ({ row }) => {
            const action = row.original;
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
                        <DropdownMenuItem className="text-green-600">
                            Approve
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                            Deny
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export default function Dashboardb() {
    // Naga infinite re render ang mga useTable. Akong na figure out kay kung ang emply iyang array mag sege siyag re render . Need Backend route for testing
    const recentPayrollData = payrollData;
    const recentLoansData = loanData;
    const rpData: recentPayrolls[] = recentPayrollData;
    const rlData: recentRequest[] = recentLoansData;

    const rpTable = useReactTable({
        data: rpData,
        columns: rpcolumns,
        getPaginationRowModel: getPaginationRowModel(),
        // Adjust Limit content after database has beeen set
        initialState: {
            pagination: {
                pageSize: 7,
            },
        },
        getCoreRowModel: getCoreRowModel(),
    });

    const rlTable = useReactTable({
        data: rlData,
        columns: rlcolumns,
        getPaginationRowModel: getPaginationRowModel(),
        // Adjust Limit content after database has beeen set
        initialState: {
            pagination: {
                pageSize: 7,
            },
        },
        getCoreRowModel: getCoreRowModel(),
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
                                columns={rpcolumns}
                                rowStyle="odd:bg-white even:bg-transparent text-center"
                                table={rpTable}
                                className="lg:h-[450px]"
                            />
                        </BodyContentLayout>
                    </div>
                </div>
            </div>
        </AuthenticatedLayoutAdmin>
    );
}
