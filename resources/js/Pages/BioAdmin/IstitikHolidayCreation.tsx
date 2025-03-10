
import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayoutBioAdmin";
import BodyContentLayout from "@/Layouts/BodyContentLayout";
import { Head, usePage } from "@inertiajs/react";
import {
    ColumnDef
} from "@tanstack/react-table";
import { Calendar } from "lucide-react";
import { DataTable } from "@/Components/DataTable";
import { Input } from "@/Components/ui/input";
import PaginationTable from "@/Components/Pagination";
import { addDays } from "date-fns";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { useTable } from "@/hooks/BioAdmin/useTable";
import { useForm } from "@inertiajs/react";
import { Alert, AlertTitle, AlertDescription } from "@/Components/ui/alert"; // Import your Alert component


type columnTypes = {
    holiday_code: number;
    date: string;
    name: string;
    type: string;
    is_recurring: boolean;
    created_at: string | null;
    updated_at: string | null;
};

// Generate the headers for the columns
const columns: ColumnDef<columnTypes>[] = [
    { accessorKey: "holiday_code", header: "Holiday No." },
    { accessorKey: "date", header: "Date" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "type", header: "Holiday Type" },
];


export default function HolidayCreation() {
    const { holidayData } = usePage<{ holidayData: ColumnType[] }>().props;
    console.log(holidayData);
    const { table, globalFilter, setGlobalFilter } = useTable({
        data: holidayData,
        columns,
    });
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 20),
    });

    const { data, setData, post, processing, errors, reset } = useForm({
        holiday_name: "",
        date: "",
        type: "",
        is_recurring: false,
    });

    const [alertMessage, setAlertMessage] = useState<{ message: string; type: "success" | "error" | null }>({
        message: "",
        type: null,
    });

    const [dialogOpen, setDialogOpen] = useState(false); // Dialog state (open/close)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        post(route("store.bioadmin.holidaycreation"), {
            onSuccess: () => {
                reset();
                setAlertMessage({
                    message: "Holiday created successfully!",
                    type: "success",
                });
                setDialogOpen(false); // Close the dialog on success

            },
            onError: (errors) => {
                console.error("Failed to create holiday:", errors);
                setAlertMessage({
                    message: "An error occurred while creating the holiday. Please check your inputs.",
                    type: "error",
                });
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
            <Head title="AttendanceRecord" />

            <BodyContentLayout headerName={"Holiday Creation"}>


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
                        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                            <DialogTrigger>
                                <section className="flex gap-1 bg-baseYellow text-black items-center justify-right p-2 rounded-[10px] pl-3 pr-5">
                                    <Calendar size={15} />
                                    Add Holiday
                                </section>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add Holiday</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label htmlFor="holiday_name">Holiday Name</label>
                                        <Input
                                            id="holiday_name"
                                            type="text"
                                            value={data.holiday_name}
                                            onChange={(e) =>
                                                setData("holiday_name", e.target.value)
                                            }
                                            className="rounded-[10px]"
                                        />
                                        {errors.holiday_name && (
                                            <div className="text-red-500">
                                                {errors.holiday_name}
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="date">Date</label>
                                        <Input
                                            id="date"
                                            type="date"
                                            value={data.date}
                                            onChange={(e) => setData("date", e.target.value)}
                                            className="rounded-[10px]"
                                        />
                                        {errors.date && (
                                            <div className="text-red-500">{errors.date}</div>
                                        )}
                                    </div>

                                    <div>
                                        <label htmlFor="type">Type</label>
                                        <Input
                                            id="type"
                                            type="text"
                                            value={data.type}
                                            onChange={(e) => setData("type", e.target.value)}
                                            className="rounded-[10px]"
                                        />
                                        {errors.type && (
                                            <div className="text-red-500">{errors.type}</div>
                                        )}
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            id="is_recurring"
                                            type="checkbox"
                                            checked={data.is_recurring}
                                            onChange={(e) =>
                                                setData("is_recurring", e.target.checked)
                                            }
                                            className="mr-2"
                                        />
                                        <label htmlFor="is_recurring">Is Recurring</label>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-baseYellow text-black px-4 py-2 rounded-[10px]"
                                    >
                                        {processing ? "Saving..." : "Save Holiday"}
                                    </button>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </section>
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
                    ></DataTable>
                    <PaginationTable table={table}></PaginationTable>
                </div>
            </BodyContentLayout>
        </AuthenticatedLayoutAdmin>
    );
}
