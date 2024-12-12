// TODO: ADD FUNCTIONALITY SA CARDS
// FIXME: RECENT PAYROLS SHOULD BE PAYROLL SHEETS NOT PAYSLIPS
// TODO: REMOVE RECENT LOAN REQUEST
// TODO: FIX LOGIC SA DATE SELECTOR

import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayout";
import StatusCard from "@/Components/StatusCard";
import {
    Banknote,
    CreditCard,
    MoreHorizontal,
    PhilippinePeso,
    TrendingDown,
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
import { AdminLinks } from "@/lib/payrollData";

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

export default function Dashboard() {
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
        <AuthenticatedLayoutAdmin title="Dashboard" links={AdminLinks}>
            <DatePickerWithRange
                className="mb-5"
                date={date}
                setDate={setDate}
            />

            <div className="flex flex-col gap-3 lg:flex-row py-2 lg:p-5 rounded-pca">
                {/* Status Card Props need Backend Data Retrieval */}
                {/* Need pag adjustments sa design sa Mobile view */}
                {/* Pwede gamitan ug Map ug naa natay data ma receive */}
                <StatusCard
                    cardPercent={95.6}
                    cardPeriodFrom={
                        date?.from ? format(date.from, "LLL dd, y") : ""
                    }
                    cardPeriodTo={date?.to ? format(date.to, "LLL dd, y") : ""}
                    cardQuantity={99999.57}
                    cardTitle="Payroll Cost"
                    Icon={PhilippinePeso}
                />
                <StatusCard
                    cardPercent={95.6}
                    cardPeriodFrom={
                        date?.from ? format(date.from, "LLL dd, y") : ""
                    }
                    cardPeriodTo={date?.to ? format(date.to, "LLL dd, y") : ""}
                    cardQuantity={99999}
                    cardTitle="Statury Pay"
                    Icon={Banknote}
                />
                <StatusCard
                    cardPercent={95.6}
                    cardPeriodFrom={
                        date?.from ? format(date.from, "LLL dd, y") : ""
                    }
                    cardPeriodTo={date?.to ? format(date.to, "LLL dd, y") : ""}
                    cardQuantity={99999}
                    cardTitle="Deductions"
                    Icon={TrendingDown}
                />
                <StatusCard
                    cardPercent={95.6}
                    cardPeriodFrom={
                        date?.from ? format(date.from, "LLL dd, y") : ""
                    }
                    cardPeriodTo={date?.to ? format(date.to, "LLL dd, y") : ""}
                    cardQuantity={99999}
                    cardTitle="Net Salary"
                    Icon={CreditCard}
                />
            </div>

            <div className="lg:flex gap-5">
                <div className="lg:w-3/4 h-full">
                    <div>
                        <BodyContentLayout
                            headerName="Recent Payrolls"
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
                <div className="lg:w-1/4 h-full">
                    <div>
                        <BodyContentLayout
                            headerName="Recent Loan Requests"
                            className="mt-5 h-fit shadow-md"
                        >
                            <DataTable
                                columns={rlcolumns}
                                rowStyle="odd:bg-white even:bg-transparent text-center"
                                table={rlTable}
                                className="lg:h-[450px]"
                            />
                        </BodyContentLayout>
                    </div>
                </div>
            </div>
        </AuthenticatedLayoutAdmin>
    );
}
