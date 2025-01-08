import { EmployeeListComboBox } from "@/Components/ComboBox";
import { DataTable } from "@/Components/DataTable";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
    ColumnDef,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import IncludeExcludeBox from "@/Components/IncludeExcludeBox";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion";
import axios from "axios";

interface EmployeesListTypes {
    appointment_code: number;
    device_bio_id: string;
    employee_code: number;
    employee_number: string;
    first_name: string;
    last_name: string;
    middle_name: string;
    name_extenstion: string | null;
    position_code: number;
    salary_step: number;
    salary_type: string;
    station_code: number;
}

const EmployeesList = () => {
    const [data, setData] = useState<Array<EmployeesListTypes>>([]);

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    route("admin.get_employee_data")
                );
                setData(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const [employeeslist, setemployeeslist] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    route("admin.get_employee_data")
                );
                setemployeeslist(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    function handleRowSelect(data: any) {
        var full_name =
            data.original.first_name + " " + data.original.last_name;
        setSelectedName(full_name);
    }

    function handleAddButton() {
        console.log(value);
    }

    const [baseItems, setBaseItems] = useState<Array<string>>([]);
    const [selectedItems, setSelectedItems] = useState<Array<string>>([]);
    const [selectedName, setSelectedName] = useState<String>("");
    const [value, setValue] = useState("");

    return (
        <div className="flex">
            <section className="w-full grid grid-cols-2 gap-5 ">
                <div className="h-full">
                    <section className="flex justify-start my-2 gap-3">
                        <EmployeeListComboBox
                            dataset={employeeslist}
                            value={value}
                            setValue={setValue}
                        />
                        <Button type="button" onClick={handleAddButton}>
                            Add Employee
                        </Button>
                    </section>
                    <ScrollArea className="h-[500px] border rounded-[10px]">
                        <DataTable
                            className="h-[500px]"
                            onMouseEnter={handleRowSelect}
                            table={table}
                            rowStyle="bg-white"
                        ></DataTable>
                    </ScrollArea>
                </div>

                <div className="flex flex-col gap-3">
                    <Label className="text-xl my-2">
                        Selected: {selectedName}
                    </Label>

                    <section className=" w-full h-[500px] grid grid-rows-2 p-2 gap-5">
                        <div>
                            <Tabs
                                defaultValue="compensations"
                                className="w-full"
                            >
                                <TabsList>
                                    <TabsTrigger value="compensations">
                                        Compensations
                                    </TabsTrigger>
                                    <TabsTrigger value="agencyshare">
                                        Agency Share
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="compensations">
                                    <IncludeExcludeBox
                                        baseItems={baseItems}
                                        selectedItems={selectedItems}
                                        setBaseItems={setBaseItems}
                                        setSelectedItems={setSelectedItems}
                                        selectedItemsName="Payroll Compensations"
                                        baseItemsName="Compensations"
                                        className="h-[200px] w-full"
                                    />
                                </TabsContent>
                                <TabsContent value="agencyshare">
                                    <IncludeExcludeBox
                                        baseItems={baseItems}
                                        selectedItems={selectedItems}
                                        setBaseItems={setBaseItems}
                                        setSelectedItems={setSelectedItems}
                                        selectedItemsName="Payroll Agency Shares"
                                        baseItemsName="Agency Shares"
                                        className="h-[200px] w-full"
                                    />
                                </TabsContent>
                            </Tabs>
                        </div>
                        <div>
                            <Tabs defaultValue="deductions" className="w-full">
                                <TabsList>
                                    <TabsTrigger value="deductions">
                                        Deductions
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="deductions">
                                    <IncludeExcludeBox
                                        baseItems={baseItems}
                                        selectedItems={selectedItems}
                                        setBaseItems={setBaseItems}
                                        setSelectedItems={setSelectedItems}
                                        selectedItemsName="Payroll Deductions"
                                        baseItemsName="Deductions"
                                        className="h-[200px] w-full"
                                    />
                                </TabsContent>
                            </Tabs>
                        </div>
                    </section>
                </div>
            </section>
        </div>
    );
};

export default EmployeesList;

const columns: ColumnDef<EmployeesListTypes>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            return (
                <p className="cursor-pointer">
                    {cn(row.original.last_name, ",", row.original.first_name)}
                </p>
            );
        },
    },
    {
        accessorKey: "compensations",
        header: "Compensations",
        cell: ({ row }) => {
            const number = Number(row.getValue("compensations"));
            return (
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1" className="border-0">
                        <AccordionTrigger className="p-0">
                            <p>₱ {number.toLocaleString("en-US")} </p>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="flex flex-col">
                                <span>Basic Pay : P3,000.00</span>
                                <span>PERA : P2,000.00</span>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            );
        },
    },
    {
        accessorKey: "deductions",
        header: "Deductions",
        cell: ({ row }) => {
            const number = Number(row.getValue("compensations"));
            return (
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1" className="border-0">
                        <AccordionTrigger className="p-0">
                            <p>₱ {number.toLocaleString("en-US")} </p>
                        </AccordionTrigger>
                        <AccordionContent>
                            {" "}
                            <div className="flex flex-col">
                                <span>GSIS_PREMIUM : P3,000.00</span>
                                <span>PEKE : P2,000.00</span>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                // <p>₱ {number.toLocaleString("en-US")} </p>
            );
        },
    },
];
