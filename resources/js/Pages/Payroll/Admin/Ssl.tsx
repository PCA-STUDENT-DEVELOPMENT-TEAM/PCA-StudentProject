import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react";
import BodyContentLayout from "@/Layouts/BodyContentLayout";
import {
    ColumnDef,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
    getFilteredRowModel,
} from "@tanstack/react-table";

import { useState } from "react";
import { Input } from "@/Components/ui/input";
import { FolderDown, FolderUp, MoreHorizontal, PlusIcon } from "lucide-react";

import {
    SslDelete,
    SslStore,
    SslUpdate,
} from "@/Components/CrudComponents/SslCrud";
import DialogMenu from "@/Components/Dialog";
import DropdownDialog from "../../../Components/DropdownDialog";
import { cn } from "@/lib/utils";
import { AdminLinks } from "@/lib/payrollData";
import { sslProfile } from "@/types/payroll";
import Table from "@/Components/PCATable";

const columns: ColumnDef<sslProfile>[] = [
    {
        accessorKey: "salary_grade",
        header: "SG",
    },
    {
        accessorKey: "step1",
        header: "STEP 1",
    },
    {
        accessorKey: "step2",
        header: "STEP 2",
    },
    {
        accessorKey: "step3",
        header: "STEP 3",
    },
    {
        accessorKey: "step4",
        header: "STEP 4",
    },
    {
        accessorKey: "step5",
        header: "STEP 5",
    },
    {
        accessorKey: "step6",
        header: "STEP 6",
    },
    {
        accessorKey: "step7",
        header: "STEP 7",
    },
    {
        accessorKey: "step8",
        header: "STEP 8",
    },

    // Action Button for the Tables .
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
                        "Editing Salary Grade ",
                        rowData.salary_grade
                    ),
                    dialogContent: <SslUpdate RowData={rowData}></SslUpdate>,
                },
                {
                    tag: "2",
                    name: "Delete",
                    dialogtitle: cn(
                        "Are you sure you want to delete Salary Grade",
                        rowData.salary_grade,
                        "?"
                    ),
                    dialogContent: (
                        <SslDelete
                            rowId={rowData.salary_grade}
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

const Ssl = () => {
    const pageData = (usePage().props.data as sslProfile[]) || [];
    const data: sslProfile[] = pageData;
    const [globalFilter, setGlobalFilter] = useState<any>([]);

    const table = useReactTable({
        data,
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

    const [openDialog, setOpenDialog] = useState(false);
    return (
        <AuthenticatedLayoutAdmin title="SSL" links={AdminLinks}>
            <div className=" w-full h-full flex flex-col flex-grow">
                <div className=" h-fit flex gap-5 w-full mb-5">
                    <Input
                        type="search"
                        onChange={(e) => setGlobalFilter(e.target.value || "")}
                        className="w-1/4 rounded-pca"
                        placeholder="Search...."
                    />
                    <div>
                        {/* Dialog Component Usage : 
                                props : 
                                trigger (React Node type) required
                                title string optional
                                description string optional
                                children react node optional
                                  */}
                        <DialogMenu
                            open={openDialog}
                            openDialog={() => setOpenDialog(!openDialog)}
                            trigger={
                                <section className="flex items-center justify-center bg-secondaryGreen p-2 text-white rounded-pca pl-3 pr-3">
                                    <PlusIcon className="mr-2 h-6 w-auto" />
                                    New SSL Profile
                                </section>
                            }
                            title="New SSL Profile"
                            description="Add New SSL Profile"
                        >
                            <SslStore
                                openDialog={() => setOpenDialog(!openDialog)}
                            />
                        </DialogMenu>
                    </div>

                    <div>
                        <DialogMenu
                            trigger={
                                <section className="flex items-center justify-center bg-secondaryGreen p-2 text-white rounded-pca pl-3 pr-3">
                                    <FolderDown className="mr-2 h-6 w-auto" />
                                    Import SSL
                                </section>
                            }
                            title="Feature Under Development"
                        />
                    </div>

                    <div>
                        <DialogMenu
                            trigger={
                                <section className="flex items-center justify-center bg-secondaryGreen p-2 text-white rounded-pca pl-3 pr-3">
                                    <FolderUp className="mr-2 h-6 w-auto" />
                                    Export SSL
                                </section>
                            }
                            title="Feature Under Development"
                        />
                    </div>
                </div>
                <Table columns={columns} table={table} />
            </div>
        </AuthenticatedLayoutAdmin>
    );
};

export default Ssl;
