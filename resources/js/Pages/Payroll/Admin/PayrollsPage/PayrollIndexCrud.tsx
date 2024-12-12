import ConfirmCancelButton from "@/Components/ConfirmCancelButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { useForm } from "@inertiajs/react";
import PayrollProperties from "./PayrollProperties";

export const PayrollsIndexStore = () => {
    const { data, setData, errors, processing } = useForm({});
    return (
        <form action="">
            <Tabs defaultValue="Properties" className="w-full">
                <TabsList className="w-full grid grid-cols-3">
                    <TabsTrigger value="Properties">Properties</TabsTrigger>
                    <TabsTrigger value="Employees">Employees List</TabsTrigger>
                    <TabsTrigger value="Signatories">Signatories</TabsTrigger>
                </TabsList>
                <TabsContent value="Properties">
                    <PayrollProperties />
                </TabsContent>
                <TabsContent value="Employees"></TabsContent>
                <TabsContent value="Signatories"></TabsContent>
            </Tabs>
            {/* <ConfirmCancelButton
                processing={processing}
                setOpenDialog={openDialog}
            ></ConfirmCancelButton> */}
        </form>
    );
};
