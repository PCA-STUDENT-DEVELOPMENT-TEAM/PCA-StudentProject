// TODO: CLEAN UP UNUSED IMPORT PARA DILI BUG AT ANG COMPONENT ON RENDER

import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayout";
import AuthenticatedLayoutEmployee from "@/Layouts/AuthenticatedLayoutEmployees";
import { Head, usePage } from "@inertiajs/react";
import StatusCardEmployee from "@/Components/StatusCardEmployee";
import {
    Banknote,
    CreditCard,
    MoreHorizontal,
    PhilippinePeso,
    TrendingDown,
    File,
    Percent,
    ClockArrowUp,
    ArrowUp,
    ArrowDown,
    ChartArea,
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

import dtrData from "@/Components/Constants/emp_data.json";
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
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";

type recentPayrolls = {
    period: string;
    name: string;
    employee_id: string;
    position: string;
    deduction: number;
    compensation: number;
};

type dtrDetails = {
    day: number;
    am: string;
    pm: string;
    tardy: number;
    undertime: number;
};

type recentRequest = {
    id: number;
    name: string;
    loan_details: string;
};

// Column definition for dtrDetails
const dtrcolumns: ColumnDef<dtrDetails>[] = [
    {
        accessorKey: "day",
        header: "DAY",
    },
    {
        accessorKey: "am",
        header: "AM",
    },
    {
        accessorKey: "pm",
        header: "PM",
    },
    {
        accessorKey: "tardy",
        header: "TARDY",
    },

    {
        accessorKey: "undertime",
        header: "UNDERTIME",
    },
];

export default function MyDTR() {
    const dtrEmployeeData = dtrData;
    const DTRdata: dtrDetails[] = dtrEmployeeData;

    const dtrTable = useReactTable({
        data: DTRdata,
        columns: dtrcolumns,
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
        <AuthenticatedLayoutEmployee>
            <Dialog>
                <div className="flex justify-between">
                    <DatePickerWithRange
                        className=""
                        date={date}
                        setDate={setDate}
                    />

                    <DialogTrigger>
                        <div className="rounded-sm overflow-hidden">
                            <section className="flex gap-1 bg-baseYellow text-black items-center justify-center p-2 rounded-pca pl-3 pr-3">
                                <File size={15} />
                                Generate Report
                            </section>
                        </div>
                    </DialogTrigger>
                </div>
            </Dialog>

            <div className="flex flex-col gap-3 lg:flex-row py-2 lg:p-5 rounded-pca">
                <StatusCardEmployee
                    cardPercent={100}
                    cardPeriodFrom={
                        date?.from ? format(date.from, "LLL dd, y") : ""
                    }
                    cardPeriodTo={date?.to ? format(date.to, "LLL dd, y") : ""}
                    cardQuantity={100}
                    cardTitle="ON TIME"
                    Icon={ChartArea}
                    StatusIcon={ArrowUp}
                />
                <StatusCardEmployee
                    cardPercent={0}
                    cardPeriodFrom={
                        date?.from ? format(date.from, "LLL dd, y") : ""
                    }
                    cardPeriodTo={date?.to ? format(date.to, "LLL dd, y") : ""}
                    cardQuantity={0}
                    cardTitle="LATE"
                    Icon={ChartArea}
                    StatusIcon={ArrowDown}
                />
                <StatusCardEmployee
                    cardPercent={0}
                    cardPeriodFrom={
                        date?.from ? format(date.from, "LLL dd, y") : ""
                    }
                    cardPeriodTo={date?.to ? format(date.to, "LLL dd, y") : ""}
                    cardQuantity={0}
                    cardTitle="TARDY"
                    Icon={ChartArea}
                    StatusIcon={ArrowDown}
                />
                <StatusCardEmployee
                    cardPercent={0}
                    cardPeriodFrom={
                        date?.from ? format(date.from, "LLL dd, y") : ""
                    }
                    cardPeriodTo={date?.to ? format(date.to, "LLL dd, y") : ""}
                    cardQuantity={0}
                    cardTitle="UNDERTIME"
                    Icon={ChartArea}
                    StatusIcon={ArrowDown}
                />
            </div>

            <div className=" h-full">
                <div>
                    <BodyContentLayout
                        headerName="DTR Details"
                        className=" mt-5 h-fit shadow-md"
                    >
                        <DataTable
                            columns={dtrcolumns}
                            rowStyle="odd:bg-white even:bg-transparent text-center"
                            table={dtrTable}
                            className="lg:h-[450px]"
                        />
                    </BodyContentLayout>
                </div>
            </div>
        </AuthenticatedLayoutEmployee>
    );
}
