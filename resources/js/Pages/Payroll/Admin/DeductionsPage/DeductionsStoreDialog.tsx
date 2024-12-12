import InputError from "@/Components/InputError";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/Components/ui/radio-group";
import { Switch } from "@/Components/ui/switch";
import { deductionTypes } from "@/types/payrollPagesTypes";

const DeductionsStoreDialog = ({
    data,
    setData,
    errors,
    selected,
    setSelected,
}: {
    data: deductionTypes;
    setData: any;
    errors: Partial<
        Record<
            | "deduction_name"
            | "shorthand"
            | "amount"
            | "is_mandatory"
            | "remittance_percent"
            | "ceiling_amount"
            | "deductionType"
            | "compensation_links",
            string
        >
    >;
    selected: string;
    setSelected: React.Dispatch<React.SetStateAction<string>>;
}) => {
    function handleRadioSelect(value: string) {
        setSelected(value);
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-5">
                <section>
                    <Label className={errors.deduction_name && "text-red-600"}>
                        Name of Deduction
                    </Label>
                    <Input
                        id="deduction_name"
                        type="text"
                        name="deduction_name"
                        value={data.deduction_name}
                        onChange={(e) =>
                            setData(
                                "deduction_name",
                                e.target.value.toUpperCase()
                            )
                        }
                    />
                    <InputError
                        message={errors.deduction_name}
                        className="mt-2"
                    />
                </section>
                <section>
                    <Label className={errors.shorthand && "text-red-600"}>
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
                    <InputError message={errors.shorthand} className="mt-2" />
                </section>
            </div>

            <RadioGroup
                required
                onValueChange={handleRadioSelect}
                value={selected}
            >
                <Label>Deduction Type</Label>
                <div className="grid grid-cols-2 gap-5">
                    <section className="flex items-center space-x-2">
                        <RadioGroupItem value="Fixed" />
                        <Label>Fixed Amount</Label>
                    </section>
                    <section>
                        <Label>Amount</Label>
                        <Input
                            disabled={selected !== "Fixed"}
                            id="amount"
                            type="number"
                            name="amount"
                            step="0.01"
                            min="1"
                            value={data.amount}
                            onChange={(e) => setData("amount", e.target.value)}
                        />
                        <InputError message={errors.amount} className="mt-2" />
                    </section>
                </div>

                <div className="grid grid-cols-2 gap-5">
                    <section className="flex items-center space-x-2">
                        <RadioGroupItem value="Remittance"></RadioGroupItem>
                        <Label>Remittance Percent</Label>
                    </section>
                    <section className="grid grid-cols-2 gap-5">
                        <section>
                            <Label>Remittance %</Label>
                            <Input
                                disabled={selected !== "Remittance"}
                                id="remittance_percent"
                                type="number"
                                name="remittance_percent"
                                step="0.01"
                                min="0"
                                value={data.remittance_percent}
                                onChange={(e) =>
                                    setData(
                                        "remittance_percent",
                                        e.target.value.toUpperCase()
                                    )
                                }
                            />
                            <InputError
                                message={errors.remittance_percent}
                                className="mt-2"
                            />
                        </section>

                        <section>
                            <Label>Ceiling Amount</Label>
                            <Input
                                disabled={selected !== "Remittance"}
                                id="ceiling_amount"
                                type="number"
                                name="ceiling_amount"
                                step="0.01"
                                min="1"
                                value={data.ceiling_amount}
                                onChange={(e) =>
                                    setData("ceiling_amount", e.target.value)
                                }
                            />
                            <InputError
                                message={errors.ceiling_amount}
                                className="mt-2"
                            />
                        </section>
                    </section>
                </div>
            </RadioGroup>

            <div className="flex items-center gap-2">
                <Switch
                    checked={data.is_mandatory}
                    onCheckedChange={(checked) =>
                        setData("is_mandatory", checked)
                    }
                ></Switch>
                <Label>Mandatory</Label>
            </div>
        </div>
    );
};

export default DeductionsStoreDialog;
