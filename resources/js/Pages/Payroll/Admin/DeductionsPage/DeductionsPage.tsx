import {
    DeductionsDelete,
    DeductionStore,
    DeductionUpdate,
} from "@/Pages/Payroll/Admin/DeductionsPage/DeductionCRUD";
import DropdownDialog from "@/Components/DropdownDialog";
import AuthenticatedLayout from "@/Components/Layouts/Common/AuthenticatedLayout";
import { Input } from "@/Components/ui/input";
import { cn } from "@/lib/utils";
import { deductionTypes } from "@/types/payrollPagesTypes";
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
import PaginationTable from "@/Components/Pagination";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";

const DeductionsPage = () => {
    const data = (usePage().props.data as deductionTypes[]) || [];
    const [globalFilter, setGlobalFilter] = useState<string>("");
    const [openDialog, setOpenDialog] = useState(false);

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
                    id: "deduction_code",
                    desc: false,
                },
            ],
        },
    });

    return (
        <AuthenticatedLayout
            pageTitle="Deductions"
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
                                    aria-label="Add Salary Grade "
                                >
                                    <Plus size={20} />
                                    <Label>Add Deduction Profile</Label>
                                </Button>
                            }
                            title="New Deduction Profile"
                        >
                            <DeductionStore
                                compensationTypes={
                                    usePage().props
                                        .compensationTypes as Array<string>
                                }
                                openDialog={() => setOpenDialog(!openDialog)}
                            ></DeductionStore>
                        </DialogMenu>
                    </div>
                </div>
                <DataTable
                    {...{
                        table,
                        rowStyle: "odd:bg-white even:bg-transparent ",
                    }}
                />
                <PaginationTable table={table}></PaginationTable>
            </div>
        </AuthenticatedLayout>
    );
};

export default DeductionsPage;

const columns: ColumnDef<deductionTypes>[] = [
    { accessorKey: "deduction_code", header: "ID" },
    { accessorKey: "deduction_name", header: "DEDUCTION NAME" },
    { accessorKey: "shorthand", header: "SHORTHAND" },
    {
        accessorKey: "amount",
        header: "AMOUNT",
        cell: ({ row }) => {
            const number = Number(row.getValue("amount"));
            return <p>₱ {number.toLocaleString("en-US")}</p>;
        },
    },
    {
        accessorKey: "is_mandatory",
        header: "MANDATORY",
        cell: ({ row }) => {
            return row.getValue("is_mandatory") == true ? "Yes" : "No";
        },
    },
    { accessorKey: "remittance_percent", header: "REMITTANCE %" },
    {
        accessorKey: "ceiling_amount",
        header: "CEILING AMOUNT",
        cell: ({ row }) => {
            const number = Number(row.getValue("ceiling_amount"));
            return <p>₱ {number.toLocaleString("en-US")}</p>;
        },
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
                    dialogtitle: cn("Edit", rowData.deduction_name),
                    dialogContent: (
                        <DeductionUpdate
                            compensationTypes={
                                usePage().props
                                    .compensationTypes as Array<string>
                            }
                            RowData={rowData}
                            setOpenDialog={setOpenDialog}
                        ></DeductionUpdate>
                    ),
                },
                {
                    tag: "2",
                    name: "Delete",
                    dialogtitle: cn(
                        "Are you sure you want to delete ",
                        rowData.deduction_name,
                        "?"
                    ),
                    dialogContent: (
                        <DeductionsDelete
                            rowId={rowData.deduction_code}
                            setOpenDialog={setOpenDialog}
                        ></DeductionsDelete>
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
