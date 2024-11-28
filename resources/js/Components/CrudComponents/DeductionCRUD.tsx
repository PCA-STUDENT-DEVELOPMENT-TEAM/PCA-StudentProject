import { useForm } from "@inertiajs/react";
import { CircleAlert, CircleCheck } from "lucide-react";
import { FormEventHandler, useEffect, useState } from "react";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import InputError from "../InputError";
import { Switch } from "../ui/switch";
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
    SelectItem,
} from "../ui/select";
import { Button } from "../ui/button";
import ConfirmCancelButton from "../ConfirmCancelButton";
import { ScrollArea } from "../ui/scroll-area";

export function DeductionStore({
    openDialog,
    compensationTypes,
}: {
    openDialog: any;
    compensationTypes: Array<string>;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        deduction_name: "",
        shorthand: "",
        amount: "",
        is_mandatory: false,
        remittance_percent: "",
        ceiling_amount: "",
        deductionType: "",
        compensation_links: [] as Array<string>,
    });

    const changeDeductionType = (value: string) => {
        setData("deductionType", value);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        if (data.deductionType === "FIXED AMOUNT") {
            data.remittance_percent = "0";
            data.ceiling_amount = "0";
        } else if (data.deductionType === "REMITTANCE") {
            data.amount = "0";
        } else {
            data.amount = "0";
            data.remittance_percent = "0";
            data.ceiling_amount = "0";
        }

        post(route("store.deduction"), {
            onSuccess: () => {
                toast(
                    <div className=" text-green-600 flex-col">
                        <div className="flex items-center">
                            <CircleCheck className="h-4" />
                            <span className="text-base">Success!</span>
                        </div>
                        <div className="flex">
                            <span className="pl-6">
                                Deduction Type {data.deduction_name} has been
                                added!
                            </span>
                        </div>
                    </div>,
                    { duration: 2000 }
                );
                reset(
                    "deduction_name",
                    "shorthand",
                    "amount",
                    "is_mandatory",
                    "remittance_percent",
                    "ceiling_amount",
                    "deductionType",
                    "compensation_links"
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

    const [compensationCopy, setCompensationCopy] = useState([
        ...compensationTypes,
    ]);
    return (
        <div className=" h-full">
            <form onSubmit={submit} className="h-full grid grid-cols-2">
                <div className="w-full flex justify-center">
                    <div className="flex flex-col ">
                        <div>
                            <div className="flex gap-3">
                                <div>
                                    <Label
                                        htmlFor="deduction_name"
                                        className={
                                            errors.deduction_name &&
                                            "text-red-600"
                                        }
                                    >
                                        DEDUCTION NAME
                                    </Label>
                                    <Input
                                        id="deduction_name"
                                        type="text"
                                        name="deduction_name"
                                        value={data.deduction_name}
                                        onChange={(e) =>
                                            setData(
                                                "deduction_name",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.deduction_name}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <Label
                                        htmlFor="shorthand"
                                        className={
                                            errors.shorthand && "text-red-600"
                                        }
                                    >
                                        SHORTHAND
                                    </Label>
                                    <Input
                                        id="shorthand"
                                        type="text"
                                        name="shorthand"
                                        value={data.shorthand}
                                        onChange={(e) =>
                                            setData("shorthand", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.shorthand}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <Label
                                className={
                                    (errors.remittance_percent ||
                                        errors.amount) &&
                                    "text-red-600"
                                }
                            >
                                DEDUCTION TYPE
                            </Label>
                            <div className="flex max-w-96">
                                <Select
                                    onValueChange={changeDeductionType}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="SELECT DEDUCTION TYPE" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="UNDERTIME">
                                            UNDERTIME
                                        </SelectItem>
                                        <SelectItem value="FIXED AMOUNT">
                                            FIXED AMOUNT
                                        </SelectItem>
                                        <SelectItem value="LOAN PAYMENT">
                                            LOAN PAYMENT
                                        </SelectItem>
                                        <SelectItem value="REMITTANCE">
                                            REMITTANCE %
                                        </SelectItem>
                                        <SelectItem value="TAX">TAX</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            {data.deductionType == "FIXED AMOUNT" && (
                                <div className="max-w-96">
                                    <Label
                                        className={
                                            errors.amount && "text-red-600"
                                        }
                                    >
                                        AMOUNT
                                    </Label>
                                    <Input
                                        min={0}
                                        id="amount"
                                        type="number"
                                        name="amount"
                                        step="any"
                                        value={data.amount}
                                        onChange={(e) =>
                                            setData("amount", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.amount}
                                        className="mt-2"
                                    />
                                </div>
                            )}

                            {data.deductionType == "REMITTANCE" && (
                                <div className="flex gap-3">
                                    <div className="max-w-96">
                                        <Label
                                            className={
                                                errors.remittance_percent &&
                                                "text-red-600"
                                            }
                                        >
                                            REMITTANCE %
                                        </Label>

                                        <Input
                                            min={0}
                                            id="remittance"
                                            type="number"
                                            name="remittance"
                                            step="any"
                                            value={data.remittance_percent}
                                            onChange={(e) =>
                                                setData(
                                                    "remittance_percent",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputError
                                            message={errors.remittance_percent}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="max-w-96">
                                        <Label
                                            className={
                                                errors.ceiling_amount &&
                                                "text-red-600"
                                            }
                                        >
                                            CIELING AMOUNT
                                        </Label>
                                        <Input
                                            min={0}
                                            id="ceiling_amount"
                                            type="number"
                                            name="ceiling_amount"
                                            step="any"
                                            value={data.ceiling_amount}
                                            onChange={(e) =>
                                                setData(
                                                    "ceiling_amount",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.ceiling_amount}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-3">
                            <div>
                                <Label>DEDUCTION SETTINGS</Label>
                                <div className="flex items-center gap-3 pt-2">
                                    <Label htmlFor="is_mandatory">
                                        Mandatory
                                    </Label>
                                    <Switch
                                        id="is_mandatory"
                                        checked={data.is_mandatory}
                                        onCheckedChange={(checked) =>
                                            setData("is_mandatory", checked)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2">
                    <div className="p-2">
                        <Label>COMPENSATION LINKS:</Label>
                        <ScrollArea className="h-[220px] rounded-md border p-4">
                            {data.compensation_links.length === 0 && (
                                <h1>EMPTY</h1>
                            )}
                            {data.compensation_links.map((types) => (
                                <div
                                    key={types}
                                    className="cursor-pointer py-1"
                                    onClick={() => {
                                        compensationCopy.push(types);
                                        setData("compensation_links", [
                                            ...data.compensation_links.filter(
                                                (item) => item !== types
                                            ),
                                        ]);
                                    }}
                                >
                                    {types}
                                </div>
                            ))}
                        </ScrollArea>
                    </div>

                    <div className="p-2">
                        <Label>COMPENSATION TYPES:</Label>
                        <ScrollArea className="h-[220px] rounded-md border p-4">
                            {compensationCopy.length === 0 && (
                                <h1 className="cursor-pointer">EMPTY</h1>
                            )}
                            {compensationCopy.map((types) => (
                                <div
                                    key={types}
                                    className="cursor-pointer py-1"
                                    onClick={() => {
                                        data.compensation_links.includes(types)
                                            ? console.log("Already Exist")
                                            : setData("compensation_links", [
                                                  ...data.compensation_links,
                                                  types,
                                              ]);
                                        setCompensationCopy(
                                            compensationCopy.filter(
                                                (item) => item !== types
                                            )
                                        );
                                    }}
                                >
                                    {types}
                                </div>
                            ))}
                        </ScrollArea>
                    </div>
                </div>
                <ConfirmCancelButton
                    processing={processing}
                    setOpenDialog={openDialog}
                ></ConfirmCancelButton>
            </form>
        </div>
    );
}

export function DeductionUpdate({
    RowData,
    setOpenDialog,
    compensationTypes,
}: {
    compensationTypes: Array<string>;
    RowData: any;
    setOpenDialog: any;
}) {
    const { data, put, setData, processing, errors } = useForm({
        deduction_name: RowData.deduction_name,
        shorthand: RowData.shorthand,
        amount: RowData.amount,
        is_mandatory: RowData.is_mandatory,
        remittance_percent: RowData.remittance_percent,
        ceiling_amount: RowData.ceiling_amount,
        deductionType: RowData.deductionType,
        compensation_links: [] as Array<string>,
    });

    useEffect(() => {
        setData(
            "compensation_links",
            RowData.compensation_links
                ? RowData.compensation_links.split(",")
                : []
        );
    }, []);
    const changeDeductionType = (value: string) => {
        setData("deductionType", value);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        console.log(data.compensation_links);

        put(route("update.deduction", RowData), {
            onSuccess: () => {
                toast(
                    <div className=" text-green-600 flex-col">
                        <div className="flex items-center">
                            <CircleCheck className="h-4" />
                            <span className="text-base">Success!</span>
                        </div>
                        <div className="flex">
                            <span className="pl-6">
                                Deduction type {data.deduction_name} has been
                                succesfully edited.
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

    const [compensationCopy, setCompensationCopy] = useState(
        RowData.compensation_links == null
            ? compensationTypes
            : compensationTypes.filter(
                  (items) => !RowData.compensation_links.includes(items)
              )
    );

    return (
        <div className=" h-full">
            <form onSubmit={submit} className="h-full grid grid-cols-2">
                <div className="w-full flex justify-center">
                    <div className="flex flex-col ">
                        <div>
                            <div className="flex gap-3">
                                <div>
                                    <Label
                                        htmlFor="deduction_name"
                                        className={
                                            errors.deduction_name &&
                                            "text-red-600"
                                        }
                                    >
                                        DEDUCTION NAME
                                    </Label>
                                    <Input
                                        id="deduction_name"
                                        type="text"
                                        name="deduction_name"
                                        value={data.deduction_name}
                                        onChange={(e) =>
                                            setData(
                                                "deduction_name",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        message={errors.deduction_name}
                                        className="mt-2"
                                    />
                                </div>
                                <div>
                                    <Label
                                        htmlFor="shorthand"
                                        className={
                                            errors.shorthand && "text-red-600"
                                        }
                                    >
                                        SHORTHAND
                                    </Label>
                                    <Input
                                        id="shorthand"
                                        type="text"
                                        name="shorthand"
                                        value={data.shorthand}
                                        onChange={(e) =>
                                            setData("shorthand", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.shorthand}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <Label
                                className={
                                    (errors.remittance_percent ||
                                        errors.amount) &&
                                    "text-red-600"
                                }
                            >
                                DEDUCTION TYPE
                            </Label>
                            <div className="flex max-w-96">
                                <Select onValueChange={changeDeductionType}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="SELECT DEDUCTION TYPE" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="UNDERTIME">
                                            UNDERTIME
                                        </SelectItem>
                                        <SelectItem value="FIXED AMOUNT">
                                            FIXED AMOUNT
                                        </SelectItem>
                                        <SelectItem value="LOAN PAYMENT">
                                            LOAN PAYMENT
                                        </SelectItem>
                                        <SelectItem value="REMITTANCE">
                                            REMITTANCE %
                                        </SelectItem>
                                        <SelectItem value="TAX">TAX</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            {data.deductionType == "FIXED AMOUNT" && (
                                <div className="max-w-96">
                                    <Label
                                        className={
                                            errors.amount && "text-red-600"
                                        }
                                    >
                                        AMOUNT
                                    </Label>
                                    <Input
                                        min={0}
                                        id="amount"
                                        type="number"
                                        name="amount"
                                        step="any"
                                        value={data.amount}
                                        onChange={(e) =>
                                            setData("amount", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.amount}
                                        className="mt-2"
                                    />
                                </div>
                            )}

                            {data.deductionType == "REMITTANCE" && (
                                <div className="flex gap-3">
                                    <div className="max-w-96">
                                        <Label
                                            className={
                                                errors.remittance_percent &&
                                                "text-red-600"
                                            }
                                        >
                                            REMITTANCE %
                                        </Label>

                                        <Input
                                            min={0}
                                            id="remittance"
                                            type="number"
                                            name="remittance"
                                            step="any"
                                            value={data.remittance_percent}
                                            onChange={(e) =>
                                                setData(
                                                    "remittance_percent",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <InputError
                                            message={errors.remittance_percent}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="max-w-96">
                                        <Label
                                            className={
                                                errors.ceiling_amount &&
                                                "text-red-600"
                                            }
                                        >
                                            CIELING AMOUNT
                                        </Label>
                                        <Input
                                            min={0}
                                            id="ceiling_amount"
                                            type="number"
                                            name="ceiling_amount"
                                            step="any"
                                            value={data.ceiling_amount}
                                            onChange={(e) =>
                                                setData(
                                                    "ceiling_amount",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.ceiling_amount}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-3">
                            <div>
                                <Label>DEDUCTION SETTINGS</Label>
                                <div className="flex items-center gap-3 pt-2">
                                    <Label htmlFor="is_mandatory">
                                        Mandatory
                                    </Label>
                                    <Switch
                                        id="is_mandatory"
                                        onCheckedChange={() => {
                                            data.is_mandatory =
                                                !data.is_mandatory;
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2">
                    <div className="p-2">
                        <Label>COMPENSATION LINKS:</Label>
                        <ScrollArea className="h-[220px] rounded-md border p-4">
                            {data.compensation_links.length === 0 && (
                                <h1>EMPTY</h1>
                            )}
                            {data.compensation_links.map((types) => (
                                <div
                                    key={types}
                                    className="cursor-pointer py-1"
                                    onClick={() => {
                                        compensationCopy.push(types);
                                        setData("compensation_links", [
                                            ...data.compensation_links.filter(
                                                (item) => item !== types
                                            ),
                                        ]);
                                        console.log(data.compensation_links);
                                    }}
                                >
                                    {types}
                                </div>
                            ))}
                        </ScrollArea>
                    </div>

                    <div className="p-2">
                        <Label>COMPENSATION TYPES:</Label>
                        <ScrollArea className="h-[220px] rounded-md border p-4">
                            {compensationCopy.length === 0 && <h1>EMPTY</h1>}
                            {compensationCopy.map((types) => (
                                <div
                                    key={types}
                                    className="cursor-pointer py-1"
                                    onClick={() => {
                                        data.compensation_links.includes(types)
                                            ? console.log("Already Exist")
                                            : setData("compensation_links", [
                                                  ...data.compensation_links,
                                                  types,
                                              ]);
                                        setCompensationCopy(
                                            compensationCopy.filter(
                                                (item) => item !== types
                                            )
                                        );
                                    }}
                                >
                                    {types}
                                </div>
                            ))}
                        </ScrollArea>
                    </div>
                </div>
                <ConfirmCancelButton
                    processing={processing}
                    setOpenDialog={setOpenDialog}
                ></ConfirmCancelButton>
            </form>
        </div>
    );
}

export function DeductionsDelete({
    rowId,
    setOpenDialog,
}: {
    rowId: number;
    setOpenDialog: any;
}) {
    const { delete: destroy } = useForm();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route("delete.deduction", rowId), {
            onSuccess: () => {
                toast(
                    <div className=" text-green-600 flex-col">
                        <div className="flex items-center">
                            <CircleCheck className="h-4" />
                            <span className="text-base">Succes</span>
                        </div>
                        <div className="flex">
                            <span className="pl-6">
                                Appointment has been succesfully deleted.
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