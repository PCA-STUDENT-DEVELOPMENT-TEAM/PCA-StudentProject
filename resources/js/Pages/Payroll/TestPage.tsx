import AuthenticatedLayoutEmployees from "@/Layouts/AuthenticatedLayoutEmployees";
import { usePage } from "@inertiajs/react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <AuthenticatedLayoutEmployees>
            <div className="w-full bg-red-400 flex justify-center items-center h-full">
                asdsad
            </div>
        </AuthenticatedLayoutEmployees>
    );
}
