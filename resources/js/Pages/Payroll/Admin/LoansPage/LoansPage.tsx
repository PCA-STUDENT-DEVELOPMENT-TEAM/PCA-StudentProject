import AuthenticatedLayout from "@/Components/Layouts/Common/AuthenticatedLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";

const LoansPage = () => {
    return (
        <AuthenticatedLayout
            pageTitle="Loan Tracker"
            navigationType="payrollAdmin"
        >
            <Tabs defaultValue="Types" className="w-[300px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="Types">Types</TabsTrigger>
                    <TabsTrigger value="Request">Request</TabsTrigger>
                </TabsList>

                <TabsContent value="Types">Hello</TabsContent>
                <TabsContent value="Request">Hello</TabsContent>
            </Tabs>
        </AuthenticatedLayout>
    );
};

export default LoansPage;
