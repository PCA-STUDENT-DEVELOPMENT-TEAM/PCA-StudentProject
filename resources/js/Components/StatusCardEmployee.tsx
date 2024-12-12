"use client";

import { ArrowUp, LucideProps, Percent, PhilippinePeso, Wallet } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";

export default function Component({
    // Default Values for props
    cardTitle = "Status Card",
    cardQuantity = 0,
    cardPercent = 0,
    cardPeriodFrom = "",
    cardPeriodTo = "",
    Icon = Wallet,
    StatusIcon = Wallet,
}: {
    cardTitle: string;
    cardQuantity: number;
    cardPercent: number;
    cardPeriodFrom?: string;
    cardPeriodTo?: string;
    Icon?: React.ComponentType<LucideProps>;
    StatusIcon?: React.ComponentType<LucideProps>;
}) {
    return (
        <Card className="border-l-emerald-800 border-l-4 rounded-pca shadow-md w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                    {/* Title for Card */}
                    {cardTitle}
                </CardTitle>
                <Icon className="hidden lg:block" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold flex items-center">
                    {/* Amount nga ibutang para sa status card */}
                    {cardQuantity}
                    <span>
                        <Percent />
                    </span>
                </div>
                <p className="text-xs text-muted-foreground">
                    {/* Report percent ug Period sa status report . Need pa ug red or green if up ang status or down */}
                    <div className="flex items-center pt-2">
                        <StatusIcon />
                        {cardPercent}% from {cardPeriodFrom}{" "}
                        {cardPeriodTo && <>to {cardPeriodTo}</>}
                    </div>
                </p>
            </CardContent>
        </Card>
    );
}
