import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayoutBioAdmin";
import BodyContentLayout from "@/Layouts/BodyContentLayout";
import { Head, usePage } from "@inertiajs/react";
import {
    ColumnDef,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { File, FileSearch } from "lucide-react";
import Data from "@/Components/Constants/data5.json";
import { DataTable } from "@/Components/DataTable";
import { Input } from "@/Components/ui/input";
import PaginationTable from "@/Components/Pagination";
import { useDateRange } from "@/hooks/BioAdmin/useDateRange";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { DatePickerWithRange } from "@/Components/DateRangePicker";
import { useTable } from "@/hooks/BioAdmin/useTable";
import { useState, useMemo, useEffect } from "react";
import { Button } from "@/Components/ui/button";

//  Set accepted column types
// type columnTypes = {
//     name: string;
//     rate: number;
//     quantity: number;
//     type: string;
//     position: string;
//     tardiness: number;
//     compensation: number;
//     deduction: number;
//     gross_amount: number;
// };
// // Generate the headers for the columns
// const columns: ColumnDef<columnTypes>[] = [
//     { accessorKey: "gross_amount", header: "No." },
//     { accessorKey: "name", header: "Name" },
//     { accessorKey: "rate", header: "AM Arrival" },
//     { accessorKey: "quantity", header: "AM Departure" },
//     { accessorKey: "type", header: "PM Arrival" },
//     { accessorKey: "position", header: "PM Departure" },
//     { accessorKey: "tardiness", header: "Tardiness" },
//     { accessorKey: "compensation", header: "Undertime" },
//     { accessorKey: "deduction", header: "Date" },

// ];
interface MyComponentProps {
    data: any; // Type this appropriately
}
type ColumnType = {
    date: string;
    employee_code: number;
    time_in_am: string;
    time_out_am: string;
    time_in_pm: string;
    time_out_pm: string;
    overtime_in: string;
    overtime_out: string;
    tardy_minutes: number;
    undertime_minutes: number;
    work_minutes: number;
};

// Generate the headers for the columns
const columns: ColumnDef<ColumnType>[] = [
    { accessorKey: "date", header: "Date" },
    { accessorKey: "employee_code", header: "Employee ID" },
    { accessorKey: "time_in_am", header: "AM Time in" },
    { accessorKey: "time_out_am", header: "AM Time out" },
    { accessorKey: "time_in_pm", header: "PM Time in" },
    { accessorKey: "time_out_pm", header: "PM Time out" },
    { accessorKey: "overtime_in", header: "Overtime In" },
    { accessorKey: "overtime_out", header: "Overtime Out" },
    { accessorKey: "tardy_minutes", header: "Tardy Minutes" },
    { accessorKey: "undertime_minutes", header: "Undertime Minutes" },
    { accessorKey: "work_minutes", header: "Work Minutes" },

];


export default function AttendanceRecord() {

    const { tableData } = usePage<{ tableData: ColumnType[] }>().props
    const { dateRange, setDateRange } = useDateRange();

    const [globalFilter, setGlobalFilter] = useState<string>("");
    const [filteredTableData, setFilteredTableData] = useState<ColumnType[]>([]);

    const { employees } = usePage<{ employees: ColumnType[] }>().props;

    // Set initial filtered data to tableData
    useEffect(() => {
        if (tableData) {
            setFilteredTableData(tableData); // Initially set to tableData
        }
    }, [tableData]);

    // Filtering logic moved to a function that gets called when the user clicks a button
    const filterData = () => {
        if (!tableData) return [];

        let filteredData = tableData || [];

        // Filter by global search
        if (globalFilter) {
            filteredData = filteredData.filter((employee) =>
                employee.employee_code.toString().includes(globalFilter)
            );
        }

        // Filter by date range
        if (dateRange?.from && dateRange?.to) {
            const start = new Date(dateRange.from);
            const end = new Date(dateRange.to);

            filteredData = filteredData.filter((row) => {
                const rowDate = new Date(row.date); // Parse the string date
                return rowDate >= start && rowDate <= end; // Ensure within range
            });
        }

        setFilteredTableData(filteredData); // Update the filtered data state
    };

    const selectedEmployee = useMemo(() => {
        if (!globalFilter) return [];  // Return an empty array if there's no globalFilter
        return employees.filter((employee) =>
            employee.employee_code.toString().includes(globalFilter)
        );
    }, [globalFilter, employees, tableData]);

    const table = useReactTable({
        data: filteredTableData,
        columns,
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <AuthenticatedLayoutAdmin
            header={<h2>Employee DTR</h2>}
        >
            <Head title="AttendanceRecord" />


            <BodyContentLayout headerName={"Employee DTR"}>
                <div className="flex items-center justify-center h-full">
                    {selectedEmployee ? (
                        <BodyContentLayout headerName="Employee Information" className="mt-5 h-fit shadow-md lg:w-2/4 bg-[#848484] bg-opacity-10">
                            <div className="grid grid-cols-4 gap-4">
                                <div className="col-span-2">
                                    <div className="grid grid-cols-2  items-center">
                                        <h3 className=" mb-2">Name </h3>
                                        <p className="rounded bg-white text-center text-xs text-black p-2 pr-5 mb-3">{selectedEmployee[0]?.first_name} {selectedEmployee[0]?.middle_name ? selectedEmployee[0]?.middle_name + ' ' : ''}{selectedEmployee[0]?.last_name}{selectedEmployee[0]?.name_extension ? ' ' + selectedEmployee[0]?.name_extension : ''}</p>
                                    </div>
                                    <div className="grid grid-cols-2  items-center">
                                        <h3 className=" mb-2">Employee ID </h3>
                                        <p className="rounded bg-white text-center text-xs text-black p-2 pr-5 mb-3">{selectedEmployee[0]?.employee_code}</p>
                                    </div>
                                    <div className="grid grid-cols-2  items-center">
                                        <h3 className=" mb-2">Email </h3>
                                        <p className="rounded bg-white text-center text-xs text-black p-2 pr-5 mb-3">no data available</p>
                                    </div>

                                </div>
                                <div className="col-span-2">
                                    <div className="grid grid-cols-2  items-center">
                                        <h3 className=" mb-2">Job Title</h3>
                                        <p className="rounded bg-white text-center text-xs text-black p-2 pr-5 mb-3">{selectedEmployee[0]?.position_code}</p>
                                    </div>
                                    <div className="grid grid-cols-2  items-center">
                                        <h3 className=" mb-2">Leave Credits</h3>
                                        <p className="rounded bg-white text-center text-xs text-black p-2 pr-5 mb-3">no data available</p>
                                    </div>
                                </div>
                            </div>
                        </BodyContentLayout>
                    ) : (
                        <BodyContentLayout headerName="Employee Information" className="mt-5 h-fit shadow-md lg:w-2/4">
                            <div className="p-5 bg-white text-center">
                                <h1>No employee selected</h1>
                            </div>
                        </BodyContentLayout>
                    )}
                </div>



                <div className="flex mb-5 justify-between">
                    <section className="flex gap-7 mt-5 w-full justify-right">
                        <section className="flex gap-7 w-1/4 justify-left">
                            <Input
                                type="text"
                                value={globalFilter || ""}
                                onChange={(e) =>
                                    setGlobalFilter(e.target.value || "")
                                }
                                placeholder="Search by Employee ID..."
                                className="rounded-[10px]"
                            />
                        </section>
                        <div>
                            <DatePickerWithRange
                                className=""
                                date={dateRange}
                                setDate={setDateRange}
                            ></DatePickerWithRange>
                        </div>

                        <Button onClick={filterData} >
                            <FileSearch />
                            Filter Data
                        </Button>
                        {globalFilter && dateRange.from && dateRange.to && (
                            <Dialog>
                                <DialogTrigger>
                                    <section className="flex gap-1 bg-baseYellow text-black items-center justify-center p-2 rounded-[10px] pl-3 pr-5">
                                        <File size={15} />
                                        Generate Report
                                    </section>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            Feature Under Development
                                        </DialogTitle>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>)}
                    </section>
                </div>

                <div>
                    {/* {selectedEmployee?.fromEmployees ? (
                        <DataTable
                            columns={columns}
                            table={table}
                            rowStyle="odd:bg-white even:bg-transparent text-center"
                        ></DataTable>
                    ) : (
                        <div className="text-center mt-5">No employee found or selected</div>
                    )} */}
                    <DataTable
                        columns={columns}
                        table={table}
                        rowStyle="odd:bg-white even:bg-transparent text-center"
                        pageSize={5} // Limit to 5 rows per page

                    ></DataTable>
                    <PaginationTable table={table}></PaginationTable>
                </div>
            </BodyContentLayout>
        </AuthenticatedLayoutAdmin>
    );
}
