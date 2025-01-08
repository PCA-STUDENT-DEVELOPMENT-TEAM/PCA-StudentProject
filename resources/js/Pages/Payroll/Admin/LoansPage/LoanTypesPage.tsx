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

const LoanTypes = () => {
    const [data, setData] = useState<Array<LoanTypesTypes>>([
        {
            loan_code: 1,
            name: "Personal Loan",
            shorthand: "PL",
            provider: "Bank of America",
        },
        {
            loan_code: 2,
            name: "Home Loan",
            shorthand: "HL",
            provider: "Wells Fargo",
        },
        {
            loan_code: 3,
            name: "Car Loan",
            shorthand: "CL",
            provider: "Chase Bank",
        },
        {
            loan_code: 4,
            name: "Education Loan",
            shorthand: "EL",
            provider: "Citibank",
        },
        {
            loan_code: 5,
            name: "Business Loan",
            shorthand: "BL",
            provider: "Goldman Sachs",
        },
    ]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div>
            <DataTable
                table={table}
                rowStyle="bg-white text-center"
                headerStyle="text-center"
            ></DataTable>
        </div>
    );
};

export default LoanTypes;

interface LoanTypesTypes {
    loan_code: number;
    name: string;
    shorthand: string;
    provider: string;
}

const columns: ColumnDef<LoanTypesTypes>[] = [
    {
        accessorKey: "loan_code",
        header: "Loan Code",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "shorthand",
        header: "Shorthand",
    },
    {
        accessorKey: "provider",
        header: "Provider",
    },

    // Action Button for the Tables .
    {
        id: "actions",
        cell: ({ row }) => {
            const [openDialog, setOpenDialog] = useState<string | null>(null);
            const rowData = row.original;
            const dialogs: dropDownDialogsTypes[] = [
                {
                    tag: "1",
                    name: "Edit",
                    dialogtitle: cn("Editing:", rowData.name),
                },
                {
                    tag: "2",
                    name: "Delete",
                    dialogtitle: cn(
                        "Are you sure you want to delete:",
                        rowData.name,
                        "?"
                    ),
                    style: "text-red-600",
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
