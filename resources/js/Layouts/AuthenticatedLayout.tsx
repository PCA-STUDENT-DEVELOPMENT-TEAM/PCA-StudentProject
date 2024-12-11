import {
    SidebarFooter,
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
    Sidebar,
    SidebarContent,
    SidebarHeader,
} from "@/Components/ui/sidebar";
import NavLink from "@/Components/NavLink";
import { Separator } from "@/Components/ui/separator";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { navigationLinks } from "@/types/payroll";

export default function AuthenticatedLayoutAdmin({
    children,
    title,
    links,
}: {
    children: React.ReactNode;
    title: string;
    links: navigationLinks[];
}) {
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
                                                className="active:bg-transparent active:scale-105 transition-transform ease-linear"
                                            >
                                                <NavLink
                                                    href={route(item.url)}
                                                    className="gap-1 w-full"
                                                >
                                                    <item.icon size={15} />
                                                    <span className="group-data-[collapsible=icon]:hidden">
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
            <main className="overflow-x-hidden">
                <header className="w-screen shadow h-14 py-4 flex gap-3 items-center pl-5">
                    <SidebarTrigger />
                    <Separator orientation="vertical" />
                    {title}
                    <Head title={title}></Head>
                </header>
                <div className={cn("h-header p-5")}>{children}</div>
            </main>
        </SidebarProvider>
    );
}
