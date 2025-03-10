import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayoutBioAdmin";
import BodyContentLayout from "@/Layouts/BodyContentLayout";
import { Head, usePage } from "@inertiajs/react";
import {
    ColumnDef,

} from "@tanstack/react-table";
import { File, MoreHorizontal } from "lucide-react";
import { DataTable } from "@/Components/DataTable";
import { Input } from "@/Components/ui/input";
import PaginationTable from "@/Components/Pagination";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { addDays } from "date-fns";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import {
    OrderRead,
    OrderStore,
    OrderUpdate,
} from "@/Components/CrudComponents/OrderCrud";
import DialogMenu from "@/Components/Dialog";
import { useTable } from "@/hooks/BioAdmin/useTable";
import DropdownDialog from "@/Components/DropdownDialog";
import { cn } from "@/lib/utils";
//  Set accepted column types
type columnTypes = {
    leave_request_code: number;
    employee_code: number;
    approver_code: number;
    description: string;
    leave_request_type: string;
    start_date: string;
    end_date: string;
    file_date: string;
    is_approved: boolean;
    created_at: string | null;
    updated_at: string | null;
};

// Generate the headers for the columns
const columns: ColumnDef<columnTypes>[] = [
    { accessorKey: "employee_code", header: "Employee ID" },
    { accessorKey: "name", header: "Name" },
    {
        accessorKey: "type", header: "Leave Type"
    },
    { accessorKey: "file_date", header: "Applied On" },
    { accessorKey: "is_approved", header: "Status" },
    {
        id: "actions",
        cell: ({ row }) => {
            const [openDialog, setOpenDialog] = useState<string | null>(null);
            const rowData = row.original;
            const dialogs = [
                {
                    tag: "1",
                    name: "View Details",
                    dialogtitle: cn("View Leave Details"),
                    dialogContent: <OrderRead RowData={rowData}></OrderRead>,
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


export default function LeaveOrder() {
    const { leaveData } = usePage<{ leaveData: ColumnType[] }>().props;
    console.log(leaveData);
    const { table, globalFilter, setGlobalFilter } = useTable({
        data: leaveData,
        columns,
    });
    const [openDialog, setOpenDialog] = useState(false);
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 20),
    });
    return (
        <AuthenticatedLayoutAdmin
            header={<h2>{usePage().component.split("/")[1]}</h2>}
        >
            <Head title="AttendanceRecord" />

            <BodyContentLayout headerName={"Leave Order"}>


                <div className="flex mb-5 justify-between">
                    <section className="flex gap-7 mt-5 w-full justify-right">

                        <section className="flex gap-7 w-1/4 justify-left">
                            <Input
                                type="text"
                                placeholder="Search..."
                                onChange={(e) =>
                                    setGlobalFilter(e.target.value || "")
                                }
                                className="rounded-[10px]"
                            />
                        </section>
                        <section className="flex gap-7 w-full justify-end">
                            <div>
                                <Select>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Leave Status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All</SelectItem>
                                        <SelectItem value="flexi">Dark</SelectItem>
                                        <SelectItem value="regular">Regular</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <DialogMenu
                                open={openDialog}
                                openDialog={() =>
                                    setOpenDialog(!openDialog)
                                }
                                trigger={
                                    <section className="flex gap-1 bg-baseYellow text-black items-center justify-right p-2 rounded-[10px] pl-3 pr-5">
                                        <File size={15} />
                                        Create Leave Order
                                    </section>
                                }
                                title="New Leave Order"
                                description="Add New Leave Order"
                            >
                                <OrderStore
                                    openDialog={() =>
                                        setOpenDialog(!openDialog,)
                                    } formType="leave"
                                />
                            </DialogMenu>
                        </section>
                    </section>
                </div>

                <div>
                    <DataTable
                        columns={columns}
                        table={table}
                        rowStyle="odd:bg-white even:bg-transparent text-center"
                    ></DataTable>
                    <PaginationTable table={table}></PaginationTable>

                </div>
            </BodyContentLayout>
        </AuthenticatedLayoutAdmin>
    );
}
