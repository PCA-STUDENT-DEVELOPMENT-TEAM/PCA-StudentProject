import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
    SidebarSeparator,
    SidebarTrigger,
} from "@/Components/ui/sidebar";
import {
    BookOpen,
    CalendarClock,
    HandCoins,
    HeartHandshake,
    LayoutDashboard,
    LucideProps,
    PhilippinePeso,
    Scale,
    ScrollText,
    TrendingDown,
    UserPen,
    Users,
    Wallet,
} from "lucide-react";
interface Item {
    label: string;
    url: string;
    icon: React.ComponentType<LucideProps>;
}
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
} from "@/Components/ui/sidebar";
import NavLink from "@/Components/NavLink";
import { Separator } from "@/Components/ui/separator";
import { Head, usePage } from "@inertiajs/react";
import { useState } from "react";
import { cn } from "@/lib/utils";
interface link {
    title: string;
    items: Item[];
}
const links: link[] = [
    {
        title: "PAYROLL SYSTEM",
        items: [
            {
                label: "My DTR",
                url: "employee.mydtr",
                icon: CalendarClock,
            },
            {
                label: "My Payslip",
                url: "employee.mypayslip",
                icon: PhilippinePeso,
            },
        ],
    },
    // {
    //     title: "REQUESTS",
    //     items: [{ label: "Loans", url: "admin.loans", icon: HandCoins }],
    // },
    // {
    //     title: "CONFIGURATIONS",
    //     items: [
    //         { label: "Employees", url: "admin.employees", icon: Users },
    //         {
    //             label: "Compensations",
    //             url: "admin.compensations",
    //             icon: Wallet,
    //         },
    //         {
    //             label: "Deductions",
    //             url: "admin.deductions",
    //             icon: TrendingDown,
    //         },
    //         {
    //             label: "Government Share",
    //             url: "admin.governmentshare",
    //             icon: HeartHandshake,
    //         },
    //         {
    //             label: "Appointment",
    //             url: "admin.appointments",
    //             icon: UserPen,
    //         },
    //         {
    //             label: "SSL",
    //             url: "admin.ssl",
    //             icon: Scale,
    //         },
    //         {
    //             label: "Format",
    //             url: "admin.formats",
    //             icon: ScrollText,
    //         },
    //     ],
    // },
];

export default function AuthenticatedLayoutEmployees({
    children,
}: {
    children: React.ReactNode;
}) {
    const component = usePage().component.split("/");
    const Title = component[component.length - 1];
    const [open, setOpen] = useState(true);
    return (
        <SidebarProvider open={open} onOpenChange={() => setOpen(!open)}>
            <Sidebar variant="sidebar" collapsible="icon">
                <SidebarHeader className="bg-baseGreen">
                        <div className="flex flex-row items-center">
                            <img
                                src="/LogoImg.png"
                                alt="PCA LOGO"
                                className="max-h-16"
                            />
                            <img
                                src="/Logotxt.png"
                                alt="PCA LOGO"
                                className={cn("max-h-20", open ? "" : "hidden")}
                            />
                        </div>
                </SidebarHeader>
                <SidebarContent className="bg-baseGreen scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-white scrollbar-track-transparent overflow-y overflow-x-hidden">
                    {links.map((link) => (
                        <SidebarGroup key={link.title}>
                            <SidebarGroupLabel className="text-white">
                                {link.title}
                            </SidebarGroupLabel>
                            <SidebarGroupContent className="mb-3">
                                <SidebarMenu>
                                    {link.items.map((item) => (
                                        <SidebarMenuItem key={item.label}>
                                            <SidebarMenuButton
                                                variant="pca"
                                                isActive={route().current(
                                                    item.url
                                                )}
                                            >
                                                <NavLink
                                                    href={route(item.url)}
                                                    className="gap-1"
                                                >
                                                    <item.icon size={15} />
                                                    <span className="group-data-[collapsible=icon]:hidden ">
                                                        {item.label}
                                                    </span>
                                                </NavLink>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                            <SidebarSeparator></SidebarSeparator>
                        </SidebarGroup>
                    ))}
                </SidebarContent>
            </Sidebar>
            <main className="overflow-hidden">
                <header className="w-screen shadow h-14 py-4 flex gap-3 items-center pl-5">
                    <SidebarTrigger />
                    <Separator orientation="vertical" />
                    {Title}
                    <Head title={Title}></Head>
                </header>
                <div className={cn("h-header p-5")}>{children}</div>
            </main>
        </SidebarProvider>
    );
}
