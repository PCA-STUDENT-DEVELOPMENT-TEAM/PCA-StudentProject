import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayoutBioAdmin";
import BodyContentLayout from "@/Layouts/BodyContentLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import {
    ColumnDef,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { File, FileSearch, Globe, Import, Search } from "lucide-react";
import { DataTable } from "@/Components/DataTable";
import { Input } from "@/Components/ui/input";
import { parseISO, isWithinInterval } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { DatePickerWithRange } from "@/Components/DateRangePicker";
import { useDateRange } from "@/hooks/BioAdmin/useDateRange";
import { useTable } from "@/hooks/BioAdmin/useTable";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { useState } from "react";
import PaginationTable from "@/Components/Pagination";

// Column Definitions
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
    { accessorKey: "work_minutes", header: "Work Time Minutes" },
];

// Filter function for date range
const filterDataByDateRange = (allData, dateRange) => {
    return allData.filter((row) => {
        if (!dateRange?.from || !dateRange?.to) return true; // No filter if date range is incomplete
        const rowDate = parseISO(row.date); // Parse the date string into a Date object
        return isWithinInterval(rowDate, {
            start: dateRange.from,
            end: dateRange.to,
        });
    });
};

export default function ShowAttendance() {
    const { allData: initialData } = usePage<{ allData: ColumnType[] }>().props;
    const [allData, setAllData] = useState(initialData);
    const [globalFilter, setGlobalFilter] = useState<string>("");

    const { dateRange, setDateRange } = useDateRange();

    // Table configuration
    const table = useReactTable({
        data: allData,
        columns,
        state: { globalFilter },
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    const { get } = useForm({});

    // Fetch logs function
    const fetchLogs = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            await get(route("bioadmin.fetchLogs"));
        } catch (error) {
            console.error("Error fetching logs:", error);
        }
    };

    // Update data when date range changes
    const handleFilterChange = () => {
        const filteredData = filterDataByDateRange(initialData, dateRange);
        setAllData(filteredData);
    };

    return (
        <AuthenticatedLayoutAdmin header={<h2>Employee Attendance Report</h2>}>
            <BodyContentLayout headerName="Employee Attendance Report">
                <div className="flex mb-5 justify-between">
                    <section className="flex gap-5 w-full justify-between">
                        <div className="flex gap-5">
                            <DatePickerWithRange
                                className=""
                                date={dateRange}
                                setDate={setDateRange}
                            />
                            <Button onClick={handleFilterChange} variant="default">
                                View List
                                <FileSearch />
                            </Button>
                        </div>
                        <Button onClick={fetchLogs} variant="update">
                            Update Log
                            <Import />
                        </Button>
                    </section>
                </div>
                <div>
                    <DataTable
                        columns={columns}
                        table={table}
                        rowStyle="odd:bg-white even:bg-transparent text-center"
                        pageSize={10} // Limit to 10 rows per page
                    />
                </div>
                <PaginationTable table={table}></PaginationTable>
            </BodyContentLayout>
        </AuthenticatedLayoutAdmin >
    );
}
