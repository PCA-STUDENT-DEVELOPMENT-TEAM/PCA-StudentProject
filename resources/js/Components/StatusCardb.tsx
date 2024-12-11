"use client";

import { LucideProps, PhilippinePeso, Wallet } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";

export default function Component({
    // Default Values for props
    cardTitle = "Status Card",
    cardQuantity = 0,
    Icon = Wallet,
}: {
    cardTitle: string;
    cardQuantity: number;
    Icon?: React.ComponentType<LucideProps>;
}) {
    return (
        <Card className="border-l-emerald-800 border-l-4 rounded-[10px] shadow-md w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {/* Title for Card */}
                    {cardTitle}
                </CardTitle>
                <Icon className="hidden lg:block" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold flex items-center">
                    <span>
                    </span>
                    {cardQuantity}
                </div>
                
            </CardContent>
        </Card>
    );
}
