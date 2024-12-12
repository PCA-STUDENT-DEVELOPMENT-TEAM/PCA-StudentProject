import { DatePicker } from "@/Components/DatePicker";
import { Checkbox } from "@/Components/ui/checkbox";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import useCheckbox from "@/hooks/use-checkbox";
import { useEffect, useState } from "react";

const PayrollProperties = () => {
    const [date, setDate] = useState<Date | undefined>();
    const { checkbox, setCheckbox } = useCheckbox({
        datePosted: false,
        datePaid: false,
        includeMandatory: false,
    });
    return (
        <div className="w-full">
            <section className="w-full grid grid-cols-4 gap-5">
                <section>
                    <Label>Fund Cluster</Label>
                    <Input></Input>
                </section>
                <section>
                    <Label>Payroll Type</Label>
                    <Input></Input>
                </section>
                <section>
                    <Label> Payroll Name</Label>
                    <Input></Input>
                </section>
                <section>
                    <Label> Payroll Format</Label>
                    <Input></Input>
                </section>

                <section>
                    <Label> Starting Date</Label>
                    <DatePicker date={date} setDate={setDate}></DatePicker>
                </section>
                <section>
                    <Label> Ending Date</Label>
                    <DatePicker date={date} setDate={setDate}></DatePicker>
                </section>
                <section className="flex flex-col gap-2">
                    <section className="flex items-center gap-2">
                        <Checkbox
                            checked={checkbox.datePosted}
                            onCheckedChange={(e) =>
                                setCheckbox("datePosted", e)
                            }
                        />
                        <Label> Date Posted</Label>
                    </section>
                    <DatePicker date={date} setDate={setDate}></DatePicker>
                </section>
                <section className="flex flex-col gap-2">
                    <section className="flex items-center gap-2">
                        <Checkbox
                            checked={checkbox.datePaid}
                            onCheckedChange={(e) => setCheckbox("datePaid", e)}
                        />
                        <Label> Date Paid</Label>
                    </section>
                    <DatePicker date={date} setDate={setDate}></DatePicker>
                </section>
                <section className="flex items-center gap-2">
                    <Checkbox />
                    <Label>Include Mandatory and Other Deductions</Label>
                </section>
            </section>

            {/* <ConfirmCancelButton></ConfirmCancelButton> */}
        </div>
    );
};

export default PayrollProperties;
