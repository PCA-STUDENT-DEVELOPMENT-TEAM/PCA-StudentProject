import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayoutAdmin";
import { Head, useForm, usePage } from "@inertiajs/react";
import BodyContentLayout from "@/Layouts/BodyContentLayout";
import {
    ColumnDef,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
    getFilteredRowModel,
} from "@tanstack/react-table";
import { DataTable } from "@/Components/DataTable";
import { FormEventHandler, useState } from "react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import {
    ChevronLeft,
    ChevronRight,
    FolderDown,
    FolderUp,
    MoreHorizontal,
    PlusIcon,
} from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import InputError from "@/Components/InputError";
import { Label } from "@/Components/ui/label";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
} from "@/Components/ui/pagination";

type sslProfile = {
    salary_grade: string;
    step1: number;
    step2: number;
    step3: number;
    step4: number;
    step5: number;
    step6: number;
    step7: number;
    step8: number;
};

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
            const action = row.original.salary_grade;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <section>
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </section>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {/* Apply Routes ug Create ug Function para mu accept ug entry */}
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        {/* Create row delete function */}
                        <DropdownMenuItem className="text-red-600">
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

function addSSL() {
    const { data, setData, post, processing, errors, reset } = useForm({
        salary_grade: "",
        step1: "",
        step2: "",
        step3: "",
        step4: "",
        step5: "",
        step6: "",
        step7: "",
        step8: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("store.ssl"), {
            onSuccess: (response) => {
                alert(response);
            },
            onFinish: () => {
                reset(
                    "salary_grade",
                    "step1",
                    "step2",
                    "step3",
                    "step4",
                    "step5",
                    "step6",
                    "step7",
                    "step8"
                );
            },
        });
    };

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    <Label htmlFor="salary_grade">Salary Grade</Label>
                    <Input
                        min={0}
                        id="salary_grade"
                        type="number"
                        name="salary_grade"
                        value={data.salary_grade}
                        onChange={(e) =>
                            setData("salary_grade", e.target.value)
                        }
                    />

                    <InputError
                        message={errors.salary_grade}
                        className="mt-2"
                    />
                </div>
                <div>
                    <Label htmlFor="step1">Step 1</Label>
                    <Input
                        min={0}
                        id="step1"
                        type="number"
                        name="step1"
                        value={data.step1}
                        onChange={(e) => setData("step1", e.target.value)}
                    />

                    <InputError message={errors.step1} className="mt-2" />
                </div>
                <div>
                    <Label htmlFor="step2">Step 2</Label>
                    <Input
                        min={0}
                        id="step2"
                        type="number"
                        name="step2"
                        value={data.step2}
                        onChange={(e) => setData("step2", e.target.value)}
                    />
                    <InputError message={errors.step2} className="mt-2" />
                </div>
                <div>
                    <Label htmlFor="step3">Step 3</Label>
                    <Input
                        min={0}
                        id="step3"
                        type="number"
                        name="step3"
                        value={data.step3}
                        onChange={(e) => setData("step3", e.target.value)}
                    />
                    <InputError message={errors.step3} className="mt-2" />
                </div>
                <div>
                    <Label htmlFor="step4">Step 4</Label>
                    <Input
                        min={0}
                        id="step4"
                        type="number"
                        name="step4"
                        value={data.step4}
                        onChange={(e) => setData("step4", e.target.value)}
                    />
                    <InputError message={errors.step4} className="mt-2" />
                </div>
                <div>
                    <Label htmlFor="step5">Step 5</Label>
                    <Input
                        min={0}
                        id="step5"
                        type="number"
                        name="step5"
                        value={data.step5}
                        onChange={(e) => setData("step5", e.target.value)}
                    />
                    <InputError message={errors.step5} className="mt-2" />
                </div>
                <div>
                    <Label htmlFor="step6">Step 6</Label>
                    <Input
                        min={0}
                        id="step6"
                        type="number"
                        name="step6"
                        value={data.step6}
                        onChange={(e) => setData("step6", e.target.value)}
                    />
                    <InputError message={errors.step6} className="mt-2" />
                </div>
                <div>
                    <Label htmlFor="step7">Step 7</Label>
                    <Input
                        min={0}
                        id="step7"
                        type="number"
                        name="step7"
                        value={data.step7}
                        onChange={(e) => setData("step7", e.target.value)}
                    />
                    <InputError message={errors.step7} className="mt-2" />
                </div>
                <div>
                    <Label htmlFor="step8">Step 8</Label>
                    <Input
                        min={0}
                        id="step8"
                        type="number"
                        name="step8"
                        value={data.step8}
                        onChange={(e) => setData("step8", e.target.value)}
                    />
                    <InputError message={errors.step8} className="mt-2" />
                </div>
                <Button className="mt-5 w-full" disabled={processing}>
                    Submit
                </Button>
            </form>
        </div>
    );
}

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
                pageSize: 10,
            },
        },
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: "auto",
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
    });

    return (
        <div>
            <AuthenticatedLayoutAdmin
                header={<h2>{usePage().component.split("/")[1]}</h2>}
            >
                <Head title="SSL" />
                <BodyContentLayout
                    headerName="SSL"
                    className="h-[800px]"
                    contentStyle="h-[650px]"
                >
                    <div className="h-full">
                        <div className="mb-5 flex gap-5 ">
                            <Input
                                type="search"
                                onChange={(e) =>
                                    setGlobalFilter(e.target.value || "")
                                }
                                className="w-1/4 rounded-[10px]"
                                placeholder="Search...."
                            />
                            <div>
                                <Dialog>
                                    <DialogTrigger>
                                        <section className="flex items-center justify-center bg-secondaryGreen p-2 text-white rounded-[10px] pl-3 pr-3">
                                            <PlusIcon className="mr-2 h-6 w-auto" />
                                            New SSL Profile
                                        </section>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                New SSL Profile
                                            </DialogTitle>
                                            <DialogDescription>
                                                Add New SSL Profile
                                            </DialogDescription>
                                            <div className="mt-5">
                                                {addSSL()}
                                            </div>
                                            <div></div>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                            </div>

                            <div>
                                <Dialog>
                                    <DialogTrigger>
                                        <section className="flex items-center justify-center bg-secondaryGreen p-2 text-white rounded-[10px] pl-3 pr-3">
                                            <FolderDown className="mr-2 h-6 w-auto" />
                                            Import SSL
                                        </section>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Feature Under Development
                                            </DialogTitle>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                            </div>

                            <div>
                                <Dialog>
                                    <DialogTrigger>
                                        <section className="flex items-center justify-center bg-secondaryGreen p-2 text-white rounded-[10px] pl-3 pr-3">
                                            <FolderUp className="mr-2 h-6 w-auto" />
                                            Export SSL
                                        </section>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                Feature Under Development
                                            </DialogTitle>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                        <DataTable
                            columns={columns}
                            rowStyle="odd:bg-white even:bg-transparent text-center"
                            table={table}
                        ></DataTable>
                        <Pagination className="flex justify-end items-end">
                            <PaginationContent>
                                <PaginationItem>
                                    <Button
                                        onClick={table.previousPage}
                                        className="bg-transparent text-black hover:bg-transparent w-30 p-2"
                                        disabled={!table.getCanPreviousPage()}
                                    >
                                        <ChevronLeft className="pr-1" />
                                        Previous
                                    </Button>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink>
                                        {table.getState().pagination.pageIndex +
                                            1}
                                    </PaginationLink>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                                <Button
                                    onClick={table.nextPage}
                                    className="bg-transparent text-black hover:bg-transparent w-30 p-2"
                                    disabled={!table.getCanNextPage()}
                                >
                                    Next
                                    <ChevronRight className="pl-1" />
                                </Button>
                            </PaginationContent>
                        </Pagination>
                    </div>
                </BodyContentLayout>
            </AuthenticatedLayoutAdmin>
        </div>
    );
};

export default Ssl;
