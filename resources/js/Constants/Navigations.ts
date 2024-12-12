
import { NavigationLinks } from "@/types/payrollLayoutTypes";
import { BookOpen, HandCoins, HeartHandshake, LayoutDashboard, Scale, ScrollText, TrendingDown, UserPen, Users, Wallet } from "lucide-react";

export const PAYROLLADMIN: Array<NavigationLinks> = [
    {
        title: "PAYROLL SYSTEM",
        links: [
            {
                label: "Dashboard",
                url: "admin.dashboard",
                icon: LayoutDashboard,
            },
            {
                label: "Payroll Index",
                url: "admin.payrolls",
                icon: BookOpen,
            },
        ],
    },
    {
        title: "SUBSYSTEMS",
        links: [{ label: "Loan Tracker", url: "admin.loans", icon: HandCoins }],
    },
    {
        title: "CONFIGURATIONS",
        links: [
            { label: "Employees", url: "admin.employee", icon: Users },
            {
                label: "Compensations",
                url: "admin.compensations",
                icon: Wallet,
            },
            {
                label: "Deductions",
                url: "admin.deduction",
                icon: TrendingDown,
            },
            {
                label: "Government Share",
                url: "admin.governmentshare",
                icon: HeartHandshake,
            },
            {
                label: "Appointment",
                url: "admin.appointment",
                icon: UserPen,
            },
            {
                label: "SSL",
                url: "admin.ssl",
                icon: Scale,
            },
            {
                label: "Format",
                url: "admin.formats",
                icon: ScrollText,
            },
        ],
    },
]

export const PAYROLLEMPLOYEE: Array<NavigationLinks> = [
    {
        title: "PAYROLL SYSTEM",
        links: [
            {
                label: "Dashboard",
                url: "admin.dashboard",
                icon: LayoutDashboard,
            },
            {
                label: "Payroll Index",
                url: "admin.payrolls",
                icon: BookOpen,
            },
        ],
    },
    {
        title: "REQUESTS",
        links: [{ label: "Loans", url: "admin.loans", icon: HandCoins }],
    },
    {
        title: "CONFIGURATIONS",
        links: [
            { label: "Employees", url: "admin.employee", icon: Users },
            {
                label: "Compensations",
                url: "admin.compensations",
                icon: Wallet,
            },
            {
                label: "Deductions",
                url: "admin.deduction",
                icon: TrendingDown,
            },
            {
                label: "Government Share",
                url: "admin.governmentshare",
                icon: HeartHandshake,
            },
            {
                label: "Appointment",
                url: "admin.appointment",
                icon: UserPen,
            },
            {
                label: "SSL",
                url: "admin.ssl",
                icon: Scale,
            },
        ],
    },
]