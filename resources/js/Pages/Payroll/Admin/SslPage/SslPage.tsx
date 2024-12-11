import { DataTable } from "@/Components/DataTable";
import DropdownDialog from "@/Components/DropdownDialog";
import AuthenticatedLayout from "@/Components/Layouts/Common/AuthenticatedLayout";
import { cn } from "@/lib/utils";
import {
    dropDownDialogsTypes,
    sslProfileTypes,
} from "@/types/payrollPagesTypes";
import { usePage } from "@inertiajs/react";
import {
    ColumnDef,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { FileDownIcon, FileUpIcon, MoreHorizontal, Plus } from "lucide-react";
import { useState } from "react";
import DialogMenu from "@/Components/Dialog";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import PaginationTable from "@/Components/Pagination";
import { SslDelete, SslStore, SslUpdate } from "./SslCrud";

const SslPage = () => {
    const data = (usePage().props.data as sslProfileTypes[]) || [];
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
                    id: "grade",
                    desc: false,
                },
            ],
        },
    });
    return (
        <AuthenticatedLayout
            pageTitle="Salary Standard Law"
            navigationType="payrollAdmin"
        >
            <div className="h-full flex flex-col">
                <div className="mb-5 flex flex-row gap-5">
                    <Input
                        type="search"
                        className="w-1/4 rounded-pca"
                        placeholder="Search...."
                    />

                    <div className="grid grid-cols-3 gap-5 w-1/4">
                        <DialogMenu
                            open={openDialog}
                            openDialog={() => setOpenDialog(!openDialog)}
                            trigger={
                                <Button
                                    className="gap-2 rounded-pca"
                                    aria-label="Add Salary Grade "
                                >
                                    <Plus size={20} />
                                    <Label>Add SG</Label>
                                </Button>
                            }
                            title="Add Salary Grade"
                            description=""
                        >
                            <SslStore
                                openDialog={() => setOpenDialog(!openDialog)}
                            />
                        </DialogMenu>
                        <DialogMenu
                            trigger={
                                <Button
                                    className="gap-2 rounded-pca"
                                    aria-label="Add SSL"
                                >
                                    <FileDownIcon size={20} />
                                    <Label>Import</Label>
                                </Button>
                            }
                            title="Feature Under Development"
                        />

                        <DialogMenu
                            trigger={
                                <Button
                                    className="gap-2 rounded-pca"
                                    aria-label="Add SSL"
                                >
                                    <FileUpIcon size={20} />
                                    <Label>Export</Label>
                                </Button>
                            }
                            title="Feature Under Development"
                        />
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

export default SslPage;

const columns: ColumnDef<sslProfileTypes>[] = [
    {
        accessorKey: "grade",
        header: "SG",
        enableSorting: true,
    },
    {
        accessorKey: "step1",
        header: "STEP 1",
        cell: ({ row }) => {
            const number = Number(row.getValue("step1"));
            return <p>₱ {number.toLocaleString("en-US")}</p>;
        },
    },
    {
        accessorKey: "step2",
        header: "STEP 2",
        cell: ({ row }) => {
            const number = Number(row.getValue("step2"));
            return <p>₱ {number.toLocaleString("en-US")}</p>;
        },
    },
    {
        accessorKey: "step3",
        header: "STEP 3",
        cell: ({ row }) => {
            const number = Number(row.getValue("step3"));
            return <p>₱ {number.toLocaleString("en-US")}</p>;
        },
    },
    {
        accessorKey: "step4",
        header: "STEP 4",
        cell: ({ row }) => {
            const number = Number(row.getValue("step4"));
            return <p>₱ {number.toLocaleString("en-US")}</p>;
        },
    },
    {
        accessorKey: "step5",
        header: "STEP 5",
        cell: ({ row }) => {
            const number = Number(row.getValue("step5"));
            return <p>₱ {number.toLocaleString("en-US")}</p>;
        },
    },
    {
        accessorKey: "step6",
        header: "STEP 6",
        cell: ({ row }) => {
            const number = Number(row.getValue("step6"));
            return <p>₱ {number.toLocaleString("en-US")}</p>;
        },
    },
    {
        accessorKey: "step7",
        header: "STEP 7",
        cell: ({ row }) => {
            const number = Number(row.getValue("step7"));
            return <p>₱ {number.toLocaleString("en-US")}</p>;
        },
    },
    {
        accessorKey: "step8",
        header: "STEP 8",
        cell: ({ row }) => {
            const number = Number(row.getValue("step8"));
            return <p>₱ {number.toLocaleString("en-US")}</p>;
        },
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
                    dialogtitle: cn("Editing Salary Grade ", rowData.grade),
                    dialogContent: (
                        <SslUpdate
                            RowData={rowData}
                            setOpenDialog={setOpenDialog}
                        ></SslUpdate>
                    ),
                },
                {
                    tag: "2",
                    name: "Delete",
                    dialogtitle: cn(
                        "Are you sure you want to delete Salary Grade",
                        rowData.grade,
                        "?"
                    ),
                    dialogContent: (
                        <SslDelete
                            rowId={rowData.grade}
                            setOpenDialog={setOpenDialog}
                        ></SslDelete>
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
