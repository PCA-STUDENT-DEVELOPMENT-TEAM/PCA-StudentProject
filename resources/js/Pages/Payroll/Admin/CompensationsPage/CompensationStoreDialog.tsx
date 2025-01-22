import InputError from "@/Components/InputError";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";
import { Switch } from "@/Components/ui/switch";
import { compensationTypes } from "@/types/payrollPagesTypes";
import { useEffect, useState } from "react";

const CompensationStoreDialog = ({
    data,
    setData,
    errors,
}: {
    data: compensationTypes;
    setData: any;
    errors: Partial<
        Record<
            | "name"
            | "shorthand"
            | "fixed_amount"
            | "is_taxable"
            | "is_fixed"
            | "compesation_variant",
            string
        >
    >;
}) => {
    const [selected, setSelected] = useState<string>();

    useEffect(() => {
        if (data.is_fixed) {
            setSelected("Fixed");
        } else if (!data.is_fixed) {
            setSelected("Basic");
        } else {
            setSelected("");
        }
    }, []);
    function handleRadioSelect(value: string) {
        setSelected(value);
        if (value == "Basic") {
            data.is_fixed = false;
        } else {
            data.is_fixed = true;
        }
    }
    return (
        <div className="flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-5">
                <section>
                    <Label
                        className={errors.name && "text-red-600"}
                    >
                        Name of Compensation
                    </Label>
                    <Input
                        id="name"
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={(e) =>
                            setData(
                                "name",
                                e.target.value.toUpperCase()
                            )
                        }
                    />
                    <InputError
                        message={errors.name}
                        className="mt-2"
                    />
                </section>

                <section>
                    <Label
                        className={errors.name && "text-red-600"}
                    >
                        Shorthand
                    </Label>
                    <Input
                        id="shorthand"
                        type="text"
                        name="shorthand"
                        value={data.shorthand}
                        onChange={(e) =>
                            setData("shorthand", e.target.value.toUpperCase())
                        }
                    />
                    <InputError
                        message={errors.name}
                        className="mt-2"
                    />
                </section>
            </div>

            <RadioGroup
                className="flex flex-col gap-2"
                required
                onValueChange={handleRadioSelect}
                value={selected}
            >
                <Label className="my-3">Compensation Type</Label>
                <div className="grid grid-cols-2 gap-5">
                    <section className="flex items-center space-x-2">
                        <RadioGroupItem value="Basic" />
                        <Label>Basic Pay</Label>
                    </section>
                </div>

                <div className="grid grid-cols-2 gap-5">
                    <section className="flex items-center space-x-2">
                        <RadioGroupItem value="Fixed" />
                        <Label>Fixed Amount</Label>
                    </section>
                    <section>
                        <Label>Amount</Label>
                        <Input
                            disabled={selected !== "Fixed"}
                            id="fixed_amount"
                            type="number"
                            name="fixed_amount"
                            step="0.01"
                            min="1"
                            value={data.fixed_amount}
                            onChange={(e) => setData("fixed_amount", e.target.value)}
                        />
                        <InputError message={errors.fixed_amount} className="mt-2" />
                    </section>
                </div>
            </RadioGroup>

            <Label className="my-3">Compensation Settings</Label>
            <div className="flex items-center gap-2">
                <Switch
                    checked={data.is_taxable}
                    onCheckedChange={(checked) =>
                        setData("is_taxable", checked)
                    }
                ></Switch>
                <Label>Taxable</Label>
            </div>
        </div>
    );
};

export default CompensationStoreDialog;
