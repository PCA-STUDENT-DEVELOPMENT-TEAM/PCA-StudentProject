import { Label } from "@/Components/ui/label";

const PayrollProperties = () => {
    return (
        <div className="w-full">
            <section className="w-full grid grid-cols-2">
                <Label>Fund Cluster</Label>
                <Label>Payroll Type</Label>
            </section>

            <Label>Include Mandatory and Other Deductions</Label>
            <Label> Starting Date</Label>
            <Label> Ending Date</Label>
            <Label> Date Posted</Label>
            <Label> Date Paid</Label>
            <Label> Payroll Format</Label>
            <Label> Payroll Name</Label>
        </div>
    );
};

export default PayrollProperties;
