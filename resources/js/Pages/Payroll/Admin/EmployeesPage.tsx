import { EmployeeEdit } from "@/Components/CrudComponents/EmployeesCRUD";
import { DataTable } from "@/Components/DataTable";
import DropdownDialog from "@/Components/DropdownDialog";
import AuthenticatedLayout from "@/Components/Layouts/Common/AuthenticatedLayout";
import PaginationTable from "@/Components/Pagination";
import { Input } from "@/Components/ui/input";
import { cn } from "@/lib/utils";
import { employeeTypes } from "@/types/payrollPagesTypes";
import {
    ColumnDef,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

const EmployeesPage = () => {
    const [data, setData] = useState<Array<employeeTypes>>([
        {
            employee_code: 1,
            first_name: "John",
            middle_name: "John",
            last_name: "Doe",
            name_entension: "",
            station_name: "Office",
            appointment_type: "Regular",
            position_title: "Agriculturist",
            grade: 1,
            step: 1,
            salary: 100,
        },
    ]);
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
                    id: "employee_code",
                    desc: false,
                },
            ],
        },
    });
    return (
        <AuthenticatedLayout
            pageTitle="Employees"
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
                </div>
                <DataTable table={table}></DataTable>
                <PaginationTable table={table}></PaginationTable>
            </div>
        </AuthenticatedLayout>
    );
};

export default EmployeesPage;

const columns: ColumnDef<employeeTypes>[] = [
    { accessorKey: "employee_code", header: "ID" },
    {
        accessorKey: "Name",
        header: "Name",
        cell: ({ row }) => {
            console.log(row.original);
            return cn(row.original.last_name, ",", row.original.first_name);
        },
    },
    { accessorKey: "station_name", header: "Station" },
    { accessorKey: "appointment_type", header: "Appointment" },
    { accessorKey: "position_title", header: "Position" },
    { accessorKey: "grade", header: "Grade" },
    { accessorKey: "step", header: "Step" },
    { accessorKey: "salary", header: "Salary" },
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
                        "Edit Employee: ",
                        rowData.last_name,
                        ",",
                        rowData.first_name
                    ),
                    dialogContent: (
                        <EmployeeEdit
                            RowData={rowData}
                            setOpenDialog={setOpenDialog}
                        ></EmployeeEdit>
                    ),
                },
            ];

            return (
                <div>
                    <DropdownDialog
                        dialogClassName="max-w-[1000px] min-h-[350px]"
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
