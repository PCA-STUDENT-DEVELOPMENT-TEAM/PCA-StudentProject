import { useForm } from "@inertiajs/react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import ConfirmCancelButton from "../ConfirmCancelButton";
import { FormEventHandler } from "react";
import { toast } from "sonner";
import { CircleAlert, CircleCheck } from "lucide-react";

const officialStation = ["Surigao", "Agusan", "Del", "Sur", "Office"];
const Appointments = ["Worker", "Tigtrabaho", "Regular"];
const positions = ["Pos1", "Pos2", "Pos3", "Pos4", "Pos5", "Agriculturist"];
const salaryGrade: Array<number> = [1, 2, 4, 5];
const step = [1, 2, 3, 4, 5];
// TODO : Route para sa steps only for selection -> JSON
// TODO : Route para sa mga available salary Gardes -> JSON
// TODO : Route para sa mga available Positions -> JSON
// TODO : Route para sa mga available nga appointments -> JSON
// TODO: Route para sa mga available nga official Stations -> JSON

//

const salary_type = [
    "Weekly",
    "Monthly",
    "Bi-Monthly",
    "Quarterly",
    "Annually",
    "Other",
];

// TODO: Table mu accept dapat ug salary type . Debatable pero ingon si sir e include ni
export function EmployeeEdit({
    RowData,
    setOpenDialog,
}: {
    RowData: any;
    setOpenDialog: any;
}) {
    const { data, setData, processing, put, reset, errors } = useForm({
        station_code: 1,
        appointment_code: 2,
        position_code: 3,
        salary_step: 4
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        put(route("update.employee", 7), {
            onSuccess: () => {
                toast(
                    <div className=" text-green-600 flex-col">
                        <div className="flex items-center">
                            <CircleCheck className="h-4" />
                            <span className="text-base">Success!</span>
                        </div>
                        <div className="flex">
                            <span className="pl-6">
                                Appointment has been succesfully edited.
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
                console.log(errors);
            },
        });
    };

    return (
        <div>
            <form onSubmit={submit} action="">
                <div className="flex gap-3">
                    <div className="w-full">
                        <Label>LAST NAME</Label>
                        <Input disabled value={data.last_name}></Input>
                    </div>

                    <div className="w-full">
                        <Label>FIRST NAME</Label>
                        <Input disabled value={data.first_name}></Input>
                    </div>

                    <div className="w-full">
                        <Label>MIDDLE NAME</Label>
                        <Input disabled value={data.middle_name}></Input>
                    </div>

                    <div className="w-full">
                        <Label>EXT. NAME</Label>
                        <Input
                            disabled
                            value={
                                data.name_extension
                                    ? data.name_extension
                                    : "N/A"
                            }
                        ></Input>
                    </div>
                </div>

                <div className="flex gap-3">
                    <div className="w-full">
                        <Label>EMPLOYEE NUMBER</Label>
                        <Input disabled value={data.employee_code}></Input>
                    </div>

                    <div className="w-full">
                        <Label>OFFICIAL STATION</Label>
                        <Select defaultValue={data.station_name}>
                            <SelectTrigger>
                                <SelectValue placeholder="SELECT STATION" />
                            </SelectTrigger>
                            <SelectContent>
                                {officialStation.map((station) => (
                                    <SelectItem value={station} key={station}>
                                        {station}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="w-full">
                        <Label>APPOINTMENT</Label>
                        <Select
                            defaultValue={data.appointment_type}
                            onValueChange={(value: string) =>
                                setData("appointment_type", value)
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="SELECT APPOINTMENT" />
                            </SelectTrigger>
                            <SelectContent>
                                {Appointments.map((Appointment: string) => (
                                    <SelectItem
                                        value={Appointment}
                                        key={Appointment}
                                    >
                                        {Appointment}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="w-full">
                        <Label>POSITION</Label>
                        <Select defaultValue={data.position_title}>
                            <SelectTrigger>
                                <SelectValue placeholder="SELECT POSITION " />
                            </SelectTrigger>
                            <SelectContent>
                                {positions.map((pos) => (
                                    <SelectItem value={pos} key={pos}>
                                        {pos}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="flex gap-3">
                    <div className="w-full">
                        <Label>SALARY TYPE</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="SELECT SALARY TYPE" />
                            </SelectTrigger>
                            <SelectContent>
                                {salary_type.map((st) => (
                                    <SelectItem value={st} key={st}>
                                        {st}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="w-full">
                        <Label>SALARY GRADE</Label>
                        <Select defaultValue={data.grade}>
                            <SelectTrigger>
                                <SelectValue placeholder="SELECT SALARY GRADE" />
                            </SelectTrigger>
                            <SelectContent>
                                {salaryGrade.map((sg) => (
                                    <SelectItem value={sg.toString()} key={sg}>
                                        {sg}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="w-full">
                        <Label>STEP</Label>
                        <Select defaultValue={data.step}>
                            <SelectTrigger>
                                <SelectValue placeholder="SELECT STEP" />
                            </SelectTrigger>
                            <SelectContent>
                                {step.map((sg) => (
                                    <SelectItem value={sg.toString()} key={sg}>
                                        {sg}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="w-full">
                        <Label>SALARY</Label>
                        <Input defaultValue={data.salary}></Input>
                    </div>
                </div>
                <ConfirmCancelButton
                    setOpenDialog={setOpenDialog}
                    processing={processing}
                ></ConfirmCancelButton>
            </form>
        </div>
    );
}
