import {
    CompensationDelete,
    CompensationStore,
    CompensationUpdate,
} from "@/Pages/Payroll/Admin/CompensationsPage/CompensationCRUD";
import DropdownDialog from "@/Components/DropdownDialog";
import AuthenticatedLayout from "@/Components/Layouts/Common/AuthenticatedLayout";
import { Input } from "@/Components/ui/input";
import { cn } from "@/lib/utils";
import { compensationTypes } from "@/types/payrollPagesTypes";
import { usePage } from "@inertiajs/react";
import {
    ColumnDef,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal, Plus } from "lucide-react";
import { useState } from "react";
import DialogMenu from "@/Components/Dialog";
import { DataTable } from "@/Components/DataTable";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";

const CompensationsPage = () => {
    const data = (usePage().props.data as compensationTypes[]) || [];
    const [openDialog, setOpenDialog] = useState(false);
    const [globalFilter, setGlobalFilter] = useState<string>("");
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: "auto",
        onGlobalFilterChange: setGlobalFilter,
        state: {
            globalFilter,
        },
        initialState: {
            pagination: {
                pageSize: 12,
            },
            sorting: [
                {
                    id: "compensation_code",
                    desc: false,
                },
            ],
        },
    });
    return (
        <AuthenticatedLayout
            pageTitle="Compensations"
            navigationType="payrollAdmin"
        >
            <div className="h-full flex flex-col">
                <div className="mb-5 flex flex-row gap-5">
                    <Input
                        type="search"
                        onChange={(e) => setGlobalFilter(e.target.value || "")}
                        className="w-1/4 rounded-pca"
                        placeholder="Search...."
                    />
                    <div className="grid grid-cols-1 gap-5 w-1/4">
                        <DialogMenu
                            dialogClassName="max-w-[1000px] min-h-[450px]"
                            open={openDialog}
                            openDialog={() => setOpenDialog(!openDialog)}
                            trigger={
                                <Button
                                    className="gap-2 rounded-pca"
                                    aria-label="Add Compensations"
                                >
                                    <Plus size={20} />
                                    <Label>Add Compensations</Label>
                                </Button>
                            }
                            title="New Compensation Profile"
                        >
                            <CompensationStore
                                openDialog={() => setOpenDialog(!openDialog)}
                            ></CompensationStore>
                        </DialogMenu>
                    </div>
                </div>
                <DataTable
                    table={table}
                    rowStyle="odd:bg-white even:bg-transparent"
                ></DataTable>
            </div>
        </AuthenticatedLayout>
    );
};

export default CompensationsPage;

const columns: ColumnDef<compensationTypes>[] = [
    { accessorKey: "compensation_code", header: "ID" },
    { accessorKey: "compensation_name", header: "COMPENSATION NAME" },
    { accessorKey: "shorthand", header: "SHORTHAND" },
    {
        accessorKey: "amount",
        header: "AMOUNT",
        cell: ({ row }) => {
            const number = Number(row.getValue("amount"));
            return row.original.is_fixed ? (
                <p>₱{number.toLocaleString("en-US")}</p>
            ) : (
                "BASIC PAY"
            );
        },
    },
    {
        accessorKey: "is_taxable",
        header: "TAXABLE",
        cell: ({ row }) => (row.getValue("is_taxable") ? "YES" : "NO"),
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const [openDialog, setOpenDialog] = useState<string | null>(null);
            const rowData = row.original;
            const dialogs = [
                {
                    tag: "1",
                    name: "Edit",
                    dialogtitle: cn(
                        "Edit Compensation ",
                        rowData.compensation_name
                    ),
                    dialogContent: (
                        <CompensationUpdate
                            RowData={rowData}
                            setOpenDialog={setOpenDialog}
                        ></CompensationUpdate>
                    ),
                },
                {
                    tag: "2",
                    name: "Delete",
                    dialogtitle: cn(
                        "Are you sure you want to delete ",
                        rowData.compensation_name,
                        "?"
                    ),
                    dialogContent: (
                        <CompensationDelete
                            rowId={rowData.compensation_code}
                            setOpenDialog={setOpenDialog}
                        ></CompensationDelete>
                    ),
                    style: "text-red-600",
                },
            ];

            return (
                <div>
                    <DropdownDialog
                        dialogClassName="max-w-[1000px] min-h-[450px]"
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
