import { useForm, usePage } from "@inertiajs/react";
import { CircleAlert, CircleCheck } from "lucide-react";
import { FormEventHandler, useState } from "react";
import { toast } from "sonner";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";

// Component for Storing SSL Data
export function SslStore({ openDialog }: { openDialog: any }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        grade: "",
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
            onSuccess: () => {
                toast(
                    <div className=" text-green-600 flex-col">
                        <div className="flex items-center">
                            <CircleCheck className="h-4" />
                            <span className="text-base">Success!</span>
                        </div>
                        <div className="flex">
                            <span className="pl-6">
                                SSL {data.grade} has been succesfully added.
                            </span>
                        </div>
                    </div>,
                    { duration: 2000 }
                );
                reset(
                    "grade",
                    "step1",
                    "step2",
                    "step3",
                    "step4",
                    "step5",
                    "step6",
                    "step7",
                    "step8"
                );
                openDialog(false);
            },
            onError: () => {
                toast(
                    <div className=" text-red-600 flex-col">
                        <div className="flex items-center">
                            <CircleAlert className="h-4" />
                            <span className="text-base">Error!</span>
                        </div>
                        <div className="flex">
                            <span className="pl-6">Please try again...</span>
                        </div>
                    </div>,
                    {
                        duration: 2000,
                    }
                );
            },
        });
    };

    return (
        <div>
            <form onSubmit={submit}>
                <div className="px-5">
                    <Label
                        htmlFor="grade"
                        className={errors.grade && "text-red-600"}
                    >
                        Salary Grade
                    </Label>
                    <Input
                        min={0}
                        id="grade"
                        type="number"
                        name="grade"
                        value={data.grade}
                        onChange={(e) => setData("grade", e.target.value)}
                    />

                    <InputError message={errors.grade} className="mt-2" />
                </div>
                <div className="flex justify-around">
                    <div>
                        <Label
                            htmlFor="step1"
                            className={errors.step1 && "text-red-600"}
                        >
                            Step 1
                        </Label>
                        <Input
                            min={0}
                            id="step1"
                            type="number"
                            name="step1"
                            step="any"
                            value={data.step1}
                            onChange={(e) => setData("step1", e.target.value)}
                        />

                        <InputError message={errors.step1} className="mt-2" />
                    </div>
                    <div>
                        <Label
                            htmlFor="step2"
                            className={errors.step2 && "text-red-600"}
                        >
                            Step 2
                        </Label>
                        <Input
                            min={0}
                            id="step2"
                            type="number"
                            name="step2"
                            step="any"
                            value={data.step2}
                            onChange={(e) => setData("step2", e.target.value)}
                        />
                        <InputError message={errors.step2} className="mt-2" />
                    </div>
                </div>

                <div className="flex justify-around">
                    <div>
                        <Label
                            htmlFor="step3"
                            className={errors.step3 && "text-red-600"}
                        >
                            Step 3
                        </Label>
                        <Input
                            min={0}
                            id="step3"
                            type="number"
                            name="step3"
                            step="any"
                            value={data.step3}
                            onChange={(e) => setData("step3", e.target.value)}
                        />
                        <InputError message={errors.step3} className="mt-2" />
                    </div>
                    <div>
                        <Label
                            htmlFor="step4"
                            className={errors.step4 && "text-red-600"}
                        >
                            Step 4
                        </Label>
                        <Input
                            min={0}
                            id="step4"
                            type="number"
                            name="step4"
                            step="any"
                            value={data.step4}
                            onChange={(e) => setData("step4", e.target.value)}
                        />
                        <InputError message={errors.step4} className="mt-2" />
                    </div>
                </div>

                <div className="flex justify-around">
                    <div>
                        <Label
                            htmlFor="step5"
                            className={errors.step5 && "text-red-600"}
                        >
                            Step 5
                        </Label>
                        <Input
                            min={0}
                            id="step5"
                            type="number"
                            name="step5"
                            step="any"
                            value={data.step5}
                            onChange={(e) => setData("step5", e.target.value)}
                        />
                        <InputError message={errors.step5} className="mt-2" />
                    </div>
                    <div>
                        <Label
                            htmlFor="step6"
                            className={errors.step6 && "text-red-600"}
                        >
                            Step 6
                        </Label>
                        <Input
                            min={0}
                            id="step6"
                            type="number"
                            name="step6"
                            step="any"
                            value={data.step6}
                            onChange={(e) => setData("step6", e.target.value)}
                        />
                        <InputError message={errors.step6} className="mt-2" />
                    </div>
                </div>
                <div className="flex justify-around">
                    <div>
                        <Label
                            htmlFor="step7"
                            className={errors.step7 && "text-red-600"}
                        >
                            Step 7
                        </Label>
                        <Input
                            min={0}
                            id="step7"
                            type="number"
                            name="step7"
                            step="any"
                            value={data.step7}
                            onChange={(e) => setData("step7", e.target.value)}
                        />
                        <InputError message={errors.step7} className="mt-2" />
                    </div>
                    <div>
                        <Label
                            htmlFor="step8"
                            className={errors.step8 && "text-red-600"}
                        >
                            Step 8
                        </Label>
                        <Input
                            min={0}
                            id="step8"
                            type="number"
                            name="step8"
                            step="any"
                            value={data.step8}
                            onChange={(e) => setData("step8", e.target.value)}
                        />
                        <InputError message={errors.step8} className="mt-2" />
                    </div>
                </div>
                <div className="flex gap-3 justify-end pl-5">
                    <Button
                        variant="ghost"
                        className="mt-5 w-full max-w-32"
                        disabled={processing}
                        type="button"
                        onClick={() => openDialog(false)}
                    >
                        Cancel
                    </Button>

                    <Button
                        className="mt-5 w-full max-w-32"
                        disabled={processing}
                        type="submit"
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
}

export function SslUpdate({
    RowData,
    setOpenDialog,
}: {
    RowData: any;
    setOpenDialog: any;
}) {
    const { data, setData, put, processing, errors, reset } = useForm({
        grade: RowData.grade,
        step1: RowData.step1,
        step2: RowData.step2,
        step3: RowData.step3,
        step4: RowData.step4,
        step5: RowData.step5,
        step6: RowData.step6,
        step7: RowData.step7,
        step8: RowData.step8,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route("update.ssl", RowData), {
            onSuccess: () => {
                toast(
                    <div className=" text-green-600 flex-col">
                        <div className="flex items-center">
                            <CircleCheck className="h-4" />
                            <span className="text-base">Success!</span>
                        </div>
                        <div className="flex">
                            <span className="pl-6">
                                SSL {data.grade} has been succesfully edited.
                            </span>
                        </div>
                    </div>,
                    { duration: 2000 }
                );
                setOpenDialog(false);
            },
            onError: () => {
                toast(
                    <div className=" text-red-600 flex-col">
                        <div className="flex items-center">
                            <CircleAlert className="h-4" />
                            <span className="text-base">Error!</span>
                        </div>
                        <div className="flex">
                            <span className="pl-6">Please try again...</span>
                        </div>
                    </div>,
                    {
                        duration: 2000,
                    }
                );
            },
        });
    };
    return (
        <div>
            <form onSubmit={submit}>
                <div className="flex justify-around">
                    <div>
                        <Label
                            htmlFor="step1"
                            className={errors.step1 && "text-red-600"}
                        >
                            Step 1
                        </Label>
                        <Input
                            min={0}
                            id="step1"
                            type="number"
                            name="step1"
                            step="any"
                            value={data.step1}
                            onChange={(e) => setData("step1", e.target.value)}
                        />

                        <InputError message={errors.step1} className="mt-2" />
                    </div>
                    <div>
                        <Label
                            htmlFor="step2"
                            className={errors.step2 && "text-red-600"}
                        >
                            Step 2
                        </Label>
                        <Input
                            min={0}
                            id="step2"
                            type="number"
                            name="step2"
                            step="any"
                            value={data.step2}
                            onChange={(e) => setData("step2", e.target.value)}
                        />
                        <InputError message={errors.step2} className="mt-2" />
                    </div>
                </div>

                <div className="flex justify-around">
                    <div>
                        <Label
                            htmlFor="step3"
                            className={errors.step3 && "text-red-600"}
                        >
                            Step 3
                        </Label>
                        <Input
                            min={0}
                            id="step3"
                            type="number"
                            name="step3"
                            step="any"
                            value={data.step3}
                            onChange={(e) => setData("step3", e.target.value)}
                        />
                        <InputError message={errors.step3} className="mt-2" />
                    </div>
                    <div>
                        <Label
                            htmlFor="step4"
                            className={errors.step4 && "text-red-600"}
                        >
                            Step 4
                        </Label>
                        <Input
                            min={0}
                            id="step4"
                            type="number"
                            name="step4"
                            step="any"
                            value={data.step4}
                            onChange={(e) => setData("step4", e.target.value)}
                        />
                        <InputError message={errors.step4} className="mt-2" />
                    </div>
                </div>

                <div className="flex justify-around">
                    <div>
                        <Label
                            htmlFor="step5"
                            className={errors.step5 && "text-red-600"}
                        >
                            Step 5
                        </Label>
                        <Input
                            min={0}
                            id="step5"
                            type="number"
                            name="step5"
                            step="any"
                            value={data.step5}
                            onChange={(e) => setData("step5", e.target.value)}
                        />
                        <InputError message={errors.step5} className="mt-2" />
                    </div>
                    <div>
                        <Label
                            htmlFor="step6"
                            className={errors.step6 && "text-red-600"}
                        >
                            Step 6
                        </Label>
                        <Input
                            min={0}
                            id="step6"
                            type="number"
                            name="step6"
                            step="any"
                            value={data.step6}
                            onChange={(e) => setData("step6", e.target.value)}
                        />
                        <InputError message={errors.step6} className="mt-2" />
                    </div>
                </div>
                <div className="flex justify-around">
                    <div>
                        <Label
                            htmlFor="step7"
                            className={errors.step7 && "text-red-600"}
                        >
                            Step 7
                        </Label>
                        <Input
                            min={0}
                            id="step7"
                            type="number"
                            name="step7"
                            step="any"
                            value={data.step7}
                            onChange={(e) => setData("step7", e.target.value)}
                        />
                        <InputError message={errors.step7} className="mt-2" />
                    </div>
                    <div>
                        <Label
                            htmlFor="step8"
                            className={errors.step8 && "text-red-600"}
                        >
                            Step 8
                        </Label>
                        <Input
                            min={0}
                            id="step8"
                            type="number"
                            name="step8"
                            step="any"
                            value={data.step8}
                            onChange={(e) => setData("step8", e.target.value)}
                        />
                        <InputError message={errors.step8} className="mt-2" />
                    </div>
                </div>
                <div className="flex gap-3 justify-end pl-5">
                    <Button
                        className="mt-5 w-full max-w-32"
                        type="button"
                        onClick={() => setOpenDialog(false)}
                        variant="ghost"
                    >
                        Cancel
                    </Button>
                    <Button
                        className="mt-5 w-full max-w-32"
                        disabled={processing}
                        type="submit"
                    >
                        Confirm
                    </Button>
                </div>
            </form>
        </div>
    );
}

export function SslDelete({
    rowId,
    setOpenDialog,
}: {
    rowId: number;
    setOpenDialog: any;
}) {
    const { delete: destroy } = useForm();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route("delete.ssl", rowId), {
            onSuccess: () => {
                toast(
                    <div className=" text-green-600 flex-col">
                        <div className="flex items-center">
                            <CircleCheck className="h-4" />
                            <span className="text-base">Succes</span>
                        </div>
                        <div className="flex">
                            <span className="pl-6">
                                SSL Salary Grade {rowId} has been succesfully
                                deleted.
                            </span>
                        </div>
                    </div>,
                    { duration: 2000 }
                );
                setOpenDialog(false);
            },
            onError: () => {
                toast(
                    <div className=" text-red-600 flex-col">
                        <div className="flex items-center">
                            <CircleAlert className="h-4" />
                            <span className="text-base">Error</span>
                        </div>
                        <div className="flex">
                            <span className="pl-6">Please try again...</span>
                        </div>
                    </div>,
                    {
                        duration: 2000,
                    }
                );
            },
        });
    };
    return (
        <>
            <form onSubmit={submit}>
                <div className="flex gap-3 w-full justify-end">
                    <Button
                        type="button"
                        onClick={() => setOpenDialog(false)}
                        variant="ghost"
                    >
                        Cancel
                    </Button>
                    <Button type="submit" variant="destructive">
                        Confirm
                    </Button>
                </div>
            </form>
        </>
    );
}
