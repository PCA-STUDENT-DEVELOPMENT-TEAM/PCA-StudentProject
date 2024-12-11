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
        employee_code: RowData.employee_code,
        first_name: RowData.first_name,
        middle_name: RowData.middle_name,
        last_name: RowData.last_name,
        name_extension: RowData.name_extension,
        station_name: RowData.station_name,
        appointment_type: RowData.appointment_type,
        position_title: RowData.position_title,
        grade: RowData.grade,
        step: RowData.step,
        salary: RowData.salary,
    });

    console.log(data.station_name);

    return (
        <div>
            <form action="">
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
