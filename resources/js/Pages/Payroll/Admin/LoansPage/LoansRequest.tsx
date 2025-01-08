import { DataTable } from "@/Components/DataTable";
import DropdownDialog from "@/Components/DropdownDialog";
import { cn } from "@/lib/utils";
import { dropDownDialogsTypes } from "@/types/payrollPagesTypes";
import {
    ColumnDef,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

interface LoanRequestTypes {
    applied_loan_code: number;
    name_employee: string;
    loan_name: number;
    start_date: string;
    end_date: string;
    monthly_amount: number;
    begin_balance: number;
    amount_paid: number;
    recent_paid: string;
    current_balance: number;
}

const columns: ColumnDef<LoanRequestTypes>[] = [
    {
        accessorKey: "applied_loan_code",
        header: "Request ID",
    },
    {
        accessorKey: "name_employee",
        header: "Name of Employee",
    },
    {
        accessorKey: "start_date",
        header: "Start Date",
    },
    {
        accessorKey: "end_date",
        header: "End Date",
    },
    {
        accessorKey: "monthly_amount",
        header: "Monthly Amount",
    },
    {
        accessorKey: "begin_balance",
        header: "Begin Balance",
    },
    {
        accessorKey: "amount_paid",
        header: "Amount Paid",
    },
    {
        accessorKey: "recent_paid",
        header: "Recent Paid",
    },

    {
        accessorKey: "current_balance",
        header: "Current Balance",
    },

    {
        id: "actions",
        cell: ({ row }) => {
            const [openDialog, setOpenDialog] = useState<string | null>(null);
            const rowData = row.original;
            const dialogs: dropDownDialogsTypes[] = [
                {
                    tag: "1",
                    name: "Edit",
                    dialogtitle: cn("Editing:", rowData.applied_loan_code),
                },
                {
                    tag: "2",
                    name: "View Paid Amount Details",
                    dialogtitle: cn("Amount Details"),
                },
                {
                    tag: "3",
                    name: "View Loan History",
                    dialogtitle: cn("Loan History"),
                },
                {
                    tag: "4",
                    name: "Delete",
                    dialogtitle: cn(
                        "Are you sure you want to delete:",
                        rowData.applied_loan_code,
                        "?"
                    ),
                    style: "text-red-600",
                },

                {
                    tag: "5",
                    name: "Reloan",
                    dialogtitle: cn("Reloan"),
                    style: "text-green-600",
                },
            ];

            return (
                <div>
                    <DropdownDialog
                        openDialog={openDialog}
                        setOpenDialog={setOpenDialog}
                        dialogs={dialogs}
                        trigger={
                            <>
                                <section>
                                    <MoreHorizontal className="h-4 w-4" />
                                </section>
                            </>
                        }
                    ></DropdownDialog>
                </div>
            );
        },
    },
];

const LoanRequests = () => {
    const [data, setData] = useState<Array<LoanRequestTypes>>([
        {
            applied_loan_code: 1001,
            name_employee: "John Doe",
            loan_name: 1,
            start_date: "2025-01-01",
            end_date: "2025-12-31",
            monthly_amount: 500.0,
            begin_balance: 6000.0,
            amount_paid: 2500.0,
            recent_paid: "2025-01-05",
            current_balance: 3500.0,
        },
        {
            applied_loan_code: 1002,
            name_employee: "Jane Smith",
            loan_name: 2,
            start_date: "2025-02-01",
            end_date: "2025-11-30",
            monthly_amount: 300.0,
            begin_balance: 3000.0,
            amount_paid: 1500.0,
            recent_paid: "2025-01-03",
            current_balance: 1500.0,
        },
        {
            applied_loan_code: 1003,
            name_employee: "Alice Johnson",
            loan_name: 3,
            start_date: "2025-03-01",
            end_date: "2026-02-28",
            monthly_amount: 400.0,
            begin_balance: 4800.0,
            amount_paid: 1200.0,
            recent_paid: "2025-01-06",
            current_balance: 3600.0,
        },
    ]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <DataTable
            table={table}
            rowStyle="bg-white text-center"
            headerStyle="text-center"
        ></DataTable>
    );
};

export default LoanRequests;
