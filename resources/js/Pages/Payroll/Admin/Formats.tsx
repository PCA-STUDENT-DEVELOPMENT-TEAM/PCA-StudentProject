import IncludeExcludeBox from "@/Components/IncludeExcludeBox";
import { Button } from "@/Components/ui/button";
import AuthenticatedLayoutAdmin from "@/Layouts/AuthenticatedLayout";

import { AdminLinks } from "@/lib/payrollData";
import { useState } from "react";

export default function Formats() {
    const [baseItems, setBaseItems] = useState<Array<string>>([
        "Regular",
        "Basic",
        "Flexi",
    ]);
    const [selectedItems, setSelectedItems] = useState<Array<string>>([
        "Regular",
    ]);
    return (
        <AuthenticatedLayoutAdmin title="Test" links={AdminLinks}>
            <IncludeExcludeBox
                baseItems={baseItems}
                selectedItems={selectedItems}
                setBaseItems={setBaseItems}
                setSelectedItems={setSelectedItems}
                selectedItemsName="Compensation Links"
                baseItemsName="Compensation Types"
                className="h-48"
            />
        </AuthenticatedLayoutAdmin>
    );
}
