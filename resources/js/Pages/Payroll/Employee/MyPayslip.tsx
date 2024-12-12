import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayout";
import AuthenticatedLayoutEmployee from "@/Layouts/AuthenticatedLayoutEmployees";
import { Head, usePage } from "@inertiajs/react";
import StatusCardEmployee from "@/Components/StatusCardEmployee";
import {
    Banknote,
    CreditCard,
    MoreHorizontal,
    PhilippinePeso,
    TrendingDown,
    File,
    Percent,
    ClockArrowUp,
    ArrowUp,
    ArrowDown,
    ChartArea,
} from "lucide-react";
import BodyContentLayout from "@/Layouts/BodyContentLayout";
import BodyContentLayoutPayslip from "@/Layouts/BodyContentLayoutPayslip";
import {
    ColumnDef,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { DataTable } from "@/Components/DataTable";
import { DatePickerWithRange } from "@/Components/DateRangePicker";

import dtrData from "@/Components/Constants/emp_data.json";
import React from "react";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";

export default function MyDTR() {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 20),
    });
    return (
        <AuthenticatedLayoutEmployee>
            <Dialog>
                <div className="flex justify-between">
                    <DatePickerWithRange
                        className=""
                        date={date}
                        setDate={setDate}
                    />

                    <DialogTrigger>
                        <div className="rounded-sm overflow-hidden">
                            <section className="flex gap-1 bg-baseYellow text-black items-center justify-center p-2 rounded-pca pl-3 pr-3">
                                <File size={15} />
                                Generate Report
                            </section>
                        </div>
                    </DialogTrigger>
                </div>
            </Dialog>

            <div className="">
                <div>
                    <BodyContentLayoutPayslip
                        headerName="PAYSLIP INFORMATION"
                        headerFullname="FULL NAME: Jack Cole"
                        headerContact="CONTACT NUMBER: 0912345678"
                        headerDesignation="DESIGNATION: Agriculturist I"
                        headerType="TYPE: Regular"
                        className="h-screen mt-5 shadow-md"
                    >
                        {/* <DataTable
                            columns={dtrcolumns}
                            rowStyle="odd:bg-white even:bg-transparent text-center"
                            table={dtrTable}
                            className="lg:h-[450px]"
                        /> */}
{/* TODO: GAMIT UG TABLE SA REACT OR IF DILI, PAG BUHAT UG COMPONENT TAPOS E MAP RA ANG DATAS */}
                        <div className="h-[70vh] overflow-x-hidden overflow-y-scroll scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                            <div className=" h-[270px] drop-shadow-custom  rounded px-5">
                                <div className="flex justify-start gap-56">
                                    <div>
                                        <span className="font-semibold">
                                            Basic Salary:
                                        </span>
                                        <div className="pt-2">
                                            <input
                                                type="text"
                                                placeholder="₱20,000.00"
                                                className="border-1 border-black rounded-sm w-80"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <span className="font-semibold">
                                            Basic Salary:
                                        </span>
                                        <div className="pt-2">
                                            <input
                                                type="text"
                                                placeholder="₱20,000.00"
                                                className="border-1 border-black rounded-sm w-80"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <span className="font-semibold">
                                            Basic Salary:
                                        </span>
                                        <div className="pt-2">
                                            <input
                                                type="text"
                                                placeholder="₱20,000.00"
                                                className="border-1 border-black rounded-sm w-80"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 p-3 bg-neutral-700 h-[40px] flex items-center text-white font-bold ">
                                    <h2>GSIS: ₱20,000.00</h2>
                                </div>

                                <div className="flex justify-start gap-56 mt-4">
                                    <div>
                                        <span className="font-semibold">
                                            GSIS Premium:
                                        </span>
                                        <div className="pt-2">
                                            <input
                                                type="text"
                                                placeholder="₱20,000.00"
                                                className="border-1 border-black rounded-sm w-80"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <span className="font-semibold">
                                            GSIS CONSO:
                                        </span>
                                        <div className="pt-2">
                                            <input
                                                type="text"
                                                placeholder="₱20,000.00"
                                                className="border-1 border-black rounded-sm w-80"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <span className="font-semibold">
                                            GSIS MPL:
                                        </span>
                                        <div className="pt-2">
                                            <input
                                                type="text"
                                                placeholder="₱20,000.00"
                                                className="border-1 border-black rounded-sm w-80"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-start gap-56 mt-3">
                                    <div>
                                        <span className="font-semibold">
                                            GSIS GFAL:
                                        </span>
                                        <div className="pt-2">
                                            <input
                                                type="text"
                                                placeholder="₱20,000.00"
                                                className="border-1 border-black rounded-sm w-80"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <span className="font-semibold">
                                            GSIS PLR:
                                        </span>
                                        <div className="pt-2">
                                            <input
                                                type="text"
                                                placeholder="₱20,000.00"
                                                className="border-1 border-black rounded-sm w-80"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <span className="font-semibold">
                                            GSIS Calamity:
                                        </span>
                                        <div className="pt-2">
                                            <input
                                                type="text"
                                                placeholder="₱20,000.00"
                                                className="border-1 border-black rounded-sm w-80"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-start gap-56 mt-3">
                                    <div>
                                        <span className="font-semibold">
                                            GSIS GFAL:
                                        </span>
                                        <div className="pt-2">
                                            <input
                                                type="text"
                                                placeholder="₱20,000.00"
                                                className="border-1 border-black rounded-sm w-80"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <span className="font-semibold">
                                            GSIS PLR:
                                        </span>
                                        <div className="pt-2">
                                            <input
                                                type="text"
                                                placeholder="₱20,000.00"
                                                className="border-1 border-black rounded-sm w-80"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 p-3 bg-neutral-700 h-[40px] flex items-center text-white font-bold ">
                                    <h2>HDMF: ₱20,000.00</h2>
                                </div>

                                <div className="flex justify-start gap-56 mt-4">
                                    <div>
                                        <span className="font-semibold">
                                            HDMF Premium:
                                        </span>
                                        <div className="pt-2">
                                            <input
                                                type="text"
                                                placeholder="₱20,000.00"
                                                className="border-1 border-black rounded-sm w-80"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <span className="font-semibold">
                                            HDMF MPL:
                                        </span>
                                        <div className="pt-2">
                                            <input
                                                type="text"
                                                placeholder="₱20,000.00"
                                                className="border-1 border-black rounded-sm w-80"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <span className="font-semibold">
                                            HDMF CALAMITY:
                                        </span>
                                        <div className="pt-2">
                                            <input
                                                type="text"
                                                placeholder="₱20,000.00"
                                                className="border-1 border-black rounded-sm w-80"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-start gap-56 mt-3">
                                    <div>
                                        <span className="font-semibold">
                                            HDMF M2:
                                        </span>
                                        <div className="pt-2">
                                            <input
                                                type="text"
                                                placeholder="₱20,000.00"
                                                className="border-1 border-black rounded-sm w-80"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <span className="font-semibold">
                                            HDMF Housing:
                                        </span>
                                        <div className="pt-2">
                                            <input
                                                type="text"
                                                placeholder="₱20,000.00"
                                                className="border-1 border-black rounded-sm w-80"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <span className="font-semibold">
                                            PHC Premium:
                                        </span>
                                        <div className="pt-2">
                                            <input
                                                type="text"
                                                placeholder="₱20,000.00"
                                                className="border-1 border-black rounded-sm w-80"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 p-3 bg-neutral-700 h-[40px] flex items-center text-white font-bold ">
                                    <h2>PCAEA: ₱20,000.00</h2>
                                </div>

                                <div className="flex justify-start gap-56 mt-3">
                                    <div>
                                        <span className="font-semibold">
                                            PCAEAE Dues:
                                        </span>
                                        <div className="pt-2">
                                            <input
                                                type="text"
                                                placeholder="₱20,000.00"
                                                className="border-1 border-black rounded-sm w-80"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <span className="font-semibold">
                                            PCAEA Mortuary:
                                        </span>
                                        <div className="pt-2">
                                            <input
                                                type="text"
                                                placeholder="₱20,000.00"
                                                className="border-1 border-black rounded-sm w-80"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <span className="font-semibold">
                                            PCAEA CDO:
                                        </span>
                                        <div className="pt-2">
                                            <input
                                                type="text"
                                                placeholder="₱20,000.00"
                                                className="border-1 border-black rounded-sm w-80"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 p-3 bg-neutral-700 h-[40px] flex items-center text-white font-bold ">
                                    <h2>OTHERS</h2>
                                </div>

                                <div className="flex justify-start gap-56 mt-3">
                                    <div>
                                        <span className="font-semibold">
                                            PCAEAE EMPCO:
                                        </span>
                                        <div className="pt-2">
                                            <input
                                                type="text"
                                                placeholder="₱20,000.00"
                                                className="border-1 border-black rounded-sm w-80"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <span className="font-semibold">
                                            PCAEA Loan:
                                        </span>
                                        <div className="pt-2">
                                            <input
                                                type="text"
                                                placeholder="₱20,000.00"
                                                className="border-1 border-black rounded-sm w-80"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <span className="font-semibold">
                                            PCAEA Others:
                                        </span>
                                        <div className="pt-2">
                                            <input
                                                type="text"
                                                placeholder="₱20,000.00"
                                                className="border-1 border-black rounded-sm w-80"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 p-3 bg-neutral-700 h-[40px] flex items-center text-white font-bold ">
                                    <h2>COMPENSATION: ₱40,000.00</h2>
                                </div>

                                <div className="flex justify-start gap-56 mt-3">
                                    <div>
                                        <span className="font-semibold">
                                            PCAEAE EMPCO:
                                        </span>
                                        <div className="pt-2">
                                            <input
                                                type="text"
                                                placeholder="₱20,000.00"
                                                className="border-1 border-black rounded-sm w-80"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <span className="font-semibold">
                                            PCAEA Loan:
                                        </span>
                                        <div className="pt-2">
                                            <input
                                                type="text"
                                                placeholder="₱20,000.00"
                                                className="border-1 border-black rounded-sm w-80"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <span className="font-semibold">
                                            PCAEA Others:
                                        </span>
                                        <div className="pt-2">
                                            <input
                                                type="text"
                                                placeholder="₱20,000.00"
                                                className="border-1 border-black rounded-sm w-80"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </BodyContentLayoutPayslip>
                </div>
            </div>
        </AuthenticatedLayoutEmployee>
    );
}
