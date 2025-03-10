import { usePage } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import { Input } from "@/Components/ui/input";
import { DataTable } from "@/Components/DataTable";
import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayoutBioAdmin";
import BodyContentLayout from "@/Layouts/BodyContentLayout";
import { Head } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { useTable } from "@/hooks/BioAdmin/useTable";
import { Button } from "@/Components/ui/button";
import { Import, UserPen } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { useEffect, useState } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/Components/ui/alert"; // Import your Alert component
import PaginationTable from "@/Components/Pagination";


type EmployeeType = {
    appointment_code: number;
    created_at: string | null;
    credits: string;
    employee_code: number;
    employee_number: string;
    first_name: string;
    is_active: boolean;
    last_name: string;
    middle_name: string | null;
    name_extension: string | null;
    position: string | null;
    position_code: number;
    salary_step: number;
    scanner_id: string;
    updated_at: string | null;
    user_code: number;
};


const columns: ColumnDef<EmployeeType>[] = [
    { accessorKey: "employee_number", header: "Employee Number" },
    {
        accessorKey: "full_name",
        header: "Name",
        cell: ({ row }) =>
            `${row.original.first_name} ${row.original.middle_name ? row.original.middle_name + ' ' : ''}${row.original.last_name}${row.original.name_extension ? ' ' + row.original.name_extension : ''}`
    },
    { accessorKey: "position_code", header: "Position Code" },
    { accessorKey: "scanner_id", header: "Biometric Device ID" },
];

export default function ManageUsers() {
    const { employees } = usePage<{ employees: EmployeeType[] }>().props;
    const { table, globalFilter, setGlobalFilter } = useTable({
        data: employees,
        columns,
    });
    const [alertMessage, setAlertMessage] = useState<{ message: string; type: "success" | "error" | null }>({
        message: "",
        type: null,
    });
    const [dialogOpen, setDialogOpen] = useState(false); // Dialog state (open/close)

    const { data, setData, post, processing, errors, reset } = useForm({
        employee_number: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        name_extension: "",
        device_bio_id: "",
        salary_type: "",
        salary_step: 1,
        position_code: "",
        appointment_code: "",
        station_code: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("store.bioadmin.manageusers"), {
            onSuccess: () => {
                reset();
                setAlertMessage({
                    message: "Employee created successfully!",
                    type: "success",
                });
                setDialogOpen(false); // Close the dialog on success

            },
            onError: (errors) => {
                if (errors.duplicate) {
                    setAlertMessage({
                        message: errors.duplicate,
                        type: "error",
                    });
                }
                setDialogOpen(false); // Close the dialog on success

            },
        });
    };
    // Clear the alert message after 3 seconds
    useEffect(() => {
        if (alertMessage.message && alertMessage.type) {
            const timer = setTimeout(() => {
                setAlertMessage({ message: "", type: null });
            }, 3000); // Clears alert after 3 seconds

            return () => clearTimeout(timer); // Clean up the timer on unmount
        }
    }, [alertMessage]); // Effect runs when alertMessage changes
    return (
        <AuthenticatedLayoutAdmin
            header={<h2>{usePage().component.split("/")[1]}</h2>}
        >
            <Head title="Manage Users" />

            <BodyContentLayout headerName={"Manage Users"}>
                <div className="flex mb-5 gap-3">
                    <Input
                        type="text"
                        placeholder="Search..."
                        onChange={(e) =>
                            setGlobalFilter(e.target.value || "")
                        }
                        className="w-1/4 rounded-[10px] ml-auto"
                    />
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger>
                            <section className="flex gap-1 bg-baseYellow text-black items-center justify-right p-2 rounded-[10px] pl-3 pr-5">
                                <UserPen size={15} />
                                Create Employee
                            </section>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create Employee</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Name Fields */}
                                <div className="flex gap-2">
                                    <div>
                                        <label htmlFor="first_name" className="block text-sm font-medium mb-1">First Name</label>
                                        <Input
                                            id="first_name"
                                            value={data.first_name}
                                            onChange={(e) => setData("first_name", e.target.value)}
                                            className="w-full"
                                        />
                                        {errors.first_name && <span className="text-red-500 text-sm">{errors.first_name}</span>}
                                    </div>
                                    <div>
                                        <label htmlFor="middle_name" className="block text-sm font-medium mb-1">Middle Name</label>
                                        <Input
                                            id="middle_name"
                                            value={data.middle_name}
                                            onChange={(e) => setData("middle_name", e.target.value)}
                                            className="w-full"
                                        />
                                        {errors.middle_name && <span className="text-red-500 text-sm">{errors.middle_name}</span>}
                                    </div>
                                    <div>
                                        <label htmlFor="last_name" className="block text-sm font-medium mb-1">Last Name</label>
                                        <Input
                                            id="last_name"
                                            value={data.last_name}
                                            onChange={(e) => setData("last_name", e.target.value)}
                                            className="w-full"
                                        />
                                        {errors.last_name && <span className="text-red-500 text-sm">{errors.last_name}</span>}
                                    </div>
                                    <div>
                                        <label htmlFor="name_extension" className="block text-sm font-medium mb-1">Name Extension</label>
                                        <Input
                                            id="name_extension"
                                            value={data.name_extension}
                                            onChange={(e) => setData("name_extension", e.target.value)}
                                            className="w-full"
                                        />
                                    </div>
                                </div>

                                {/* Other Fields */}
                                <div className="flex gap-2 w-full ">
                                    <div className="w-full">
                                        <label htmlFor="salary_type" className="block text-sm font-medium mb-1">Salary Type</label>
                                        <select
                                            id="salary_type"
                                            value={data.salary_type}
                                            onChange={(e) => setData("salary_type", e.target.value)}
                                            className="w-full border rounded-md p-2"
                                        >
                                            <option value="">Select Salary Type</option>
                                            <option value="hourly">Hourly</option>
                                            <option value="monthly">Monthly</option>
                                        </select>
                                        {errors.salary_type && <span className="text-red-500 text-sm">{errors.salary_type}</span>}
                                    </div>
                                    {/* Salary Step */}
                                    <div className="w-full">
                                        <label htmlFor="salary_step" className="block text-sm font-medium mb-1">Salary Step</label>
                                        <Input
                                            id="salary_step"
                                            type="number"
                                            value={data.salary_step}
                                            onChange={(e) => setData("salary_step", e.target.value)}
                                            className="w-full"
                                        />
                                        {errors.salary_step && (
                                            <span className="text-red-500 text-sm">{errors.salary_step}</span>
                                        )}
                                    </div>
                                </div>

                                {/* Device Bio ID */}
                                <div>
                                    <label htmlFor="device_bio_id" className="block text-sm font-medium mb-1">Device Bio ID</label>
                                    <Input
                                        id="device_bio_id"
                                        type="number"
                                        value={data.device_bio_id}
                                        onChange={(e) => setData("device_bio_id", e.target.value)}
                                        className="w-full"
                                    />
                                    {errors.device_bio_id && (
                                        <span className="text-red-500 text-sm">{errors.device_bio_id}</span>
                                    )}
                                </div>



                                {/* Position Code */}
                                <div>
                                    <label htmlFor="position_code" className="block text-sm font-medium mb-1">Position Code</label>
                                    <Input
                                        id="position_code"
                                        value={data.position_code}
                                        onChange={(e) => setData("position_code", e.target.value)}
                                        className="w-full"
                                    />
                                    {errors.position_code && (
                                        <span className="text-red-500 text-sm">{errors.position_code}</span>
                                    )}
                                </div>

                                {/* Appointment Code */}
                                <div>
                                    <label htmlFor="appointment_code" className="block text-sm font-medium mb-1">Appointment Code</label>
                                    <Input
                                        id="appointment_code"
                                        value={data.appointment_code}
                                        onChange={(e) => setData("appointment_code", e.target.value)}
                                        className="w-full"
                                    />
                                    {errors.appointment_code && (
                                        <span className="text-red-500 text-sm">{errors.appointment_code}</span>
                                    )}
                                </div>

                                {/* Station Code */}
                                <div>
                                    <label htmlFor="station_code" className="block text-sm font-medium mb-1">Station Code</label>
                                    <Input
                                        id="station_code"
                                        value={data.station_code}
                                        onChange={(e) => setData("station_code", e.target.value)}
                                        className="w-full"
                                    />
                                    {errors.station_code && (
                                        <span className="text-red-500 text-sm">{errors.station_code}</span>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-baseYellow text-black px-4 py-2 rounded-[10px]"
                                    >
                                        {processing ? "Saving..." : "Save Employee"}
                                    </button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
                {alertMessage.message && (
                    <Alert variant={alertMessage.type === "success" ? "default" : "destructive"}>
                        <AlertTitle>{alertMessage.type === "success" ? "Success!" : "Error"}</AlertTitle>
                        <AlertDescription>{alertMessage.message}</AlertDescription>
                    </Alert>
                )}
                <div>
                    <DataTable
                        columns={columns}
                        table={table}
                        rowStyle="odd:bg-white even:bg-transparent text-center"
                    />                    <PaginationTable table={table}></PaginationTable>


                </div>
            </BodyContentLayout>
        </AuthenticatedLayoutAdmin >
    );
}
