import AuthenticatedLayout from "@/Components/Layouts/Common/AuthenticatedLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import LoanTypes from "./LoanTypesPage";
import LoanRequests from "./LoansRequest";
import { usePage } from "@inertiajs/react";

const LoansPage = () => {
    console.log(usePage().props);
    return (
        <AuthenticatedLayout
            pageTitle="Loan Tracker"
            navigationType="payrollAdmin"
        >
            <Tabs defaultValue="Types" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="Types">Types</TabsTrigger>
                    <TabsTrigger value="Request">Request</TabsTrigger>
                </TabsList>

                <TabsContent value="Types">
                    <LoanTypes></LoanTypes>
                </TabsContent>
                <TabsContent value="Request">
                    <LoanRequests></LoanRequests>
                </TabsContent>
            </Tabs>
        </AuthenticatedLayout>
    );
};
export default LoansPage;
