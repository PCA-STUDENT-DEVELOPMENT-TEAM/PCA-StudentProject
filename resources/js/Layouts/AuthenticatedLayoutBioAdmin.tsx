import { PropsWithChildren, ReactNode, useState, useEffect } from "react";
import {
    Sidenavbar,
    Sidenavbargroup,
    Sidenavbarlinks,
} from "@/Components/Sidenavbar";
import {
    BookOpen,
    Cog,
    Files,
    HandCoins,
    HeartHandshake,
    LayoutDashboard,
    LogOut,
    PanelLeft,
    Scale,
    ScrollText,
    TrendingDown,
    User,
    UserPen,
    Users,
    Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, usePage } from "@inertiajs/react";
import { LucideProps } from "lucide-react";
import { Separator } from "@/Components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import NavLink from "@/Components/NavLink";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const currentPage = usePage();
    interface Item {
        label: string;
        url: string;
        icon: React.ComponentType<LucideProps>;
    }

    interface link {
        title: string;
        items: Item[];
    }

    // Links for the Navigation Bar : title attribute kay para sa mga header sa each navigation group
    // Items kay para sa mga links na sa nav bar
    // Para sa Icons Limit lang sa Lucide React nga Icons kay mao naka set nga type . Goto https://lucide.dev/icons/ for selection
    // or if gusto mo lain pag butang rag or sa icon sa Item nga interface
    const links: link[] = [
        {
            title: "BIOMETRICS SYSTEM",
            items: [
                {
                    label: "Dashboard",
                    url: "bioadmin.dashboard",
                    icon: LayoutDashboard,
                },
                {
                    label: "Attendance List",
                    url: "bioadmin.attendancelists",
                    icon: Users,
                },
                {
                    label: "Attendance Records",
                    url: "bioadmin.attendancerecords",
                    icon: Files,
                },
                {
                    label: "Manage Users",
                    url: "bioadmin.manageusers",
                    icon: Users,
                },
            ],
        },

    ];

    // State para sa collapsabe navbar

    const [navStatus, setnavStatus] = useState(false);
    const [email, setEmail] = useState<string>('');

	useEffect( () => {
		let display_email = localStorage.getItem('email');

		if (display_email)
		{
			setEmail(display_email);
		}
	});

    return (
        <div className="min-h-screen bg-gray-100">
            {header && (
                <header className="bg-white shadow">
                    <nav>
                        <Sidenavbar
                            className={cn(
                                "transition-all duration-100 ",
                                navStatus ? "w-64 sm:w-16" : "w-16 sm:w-64"
                            )}
                        >

                            <div className="scrollbar-track-rounded scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-white scrollbar-track-transparent overflow-y overflow-x-hidden pl-5">
                                {/* Diri mag generate ug mga groups sa navagation bar. Mao ni nga map mag generate sa mga title*/}
                                {links.map((link) => (
                                    <Sidenavbargroup
                                        className="mt-7"
                                        key={link.title}
                                    >
                                        <h1
                                            className={cn(
                                                "text-white font-bold text-xl hidden sm:block",
                                                navStatus
                                                    ? "block sm:hidden"
                                                    : "hidden sm:block"
                                            )}
                                        >
                                            {link.title}
                                        </h1>

                                        {/* Diri nga component mag generate ug mga links para sa navbar .  walay className nga props kay wanako na apilan sulod nalng sa component*/}
                                        <Sidenavbarlinks
                                            navStatus={navStatus}
                                            links={link.items}
                                        />
                                    </Sidenavbargroup>
                                ))}
                            </div>
                        </Sidenavbar>
                    </nav>

                    {/* Mao ni ang pag generate sa header */}
                    <div
                        className={cn(
                            " transition-all duration-200 ease-in-out py-2 px-6 sm:px-6 flex gap-3 z-40 justify-between",
                            navStatus ? "ml-64 sm:ml-16" : "ml-16 sm:ml-64"
                        )}
                    >
                        <div className="flex items-center gap-3">
                            <PanelLeft
                                onClick={() => setnavStatus(!navStatus)}
                            />
                            <Separator orientation="vertical" />
                            <span
                                className={
                                    navStatus ? "hidden md:block" : "block"
                                }
                            >
                                {header}
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            {/* TODO : Add a welcome to the user : Dili nata mag search bar kay taga page tag duha duha nag search bar niya no scroll man ato page*/}
                            <h1 className="hidden lg:block">
                                Welcome {email}
                            </h1>
                            <Separator orientation="vertical" />
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Avatar>
                                        <AvatarImage
                                            src="https://github.com/shadcn.png"
                                            alt="@shadcn"
                                        />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>
                                        My Account
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {/* <DropdownMenuItem>
                                        <Link href="#" className="flex">
                                            <User className="w-5 pr-1" />
                                            Profile
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link href="#" className="flex">
                                            <Cog className="w-5 pr-1" />
                                            Settings
                                        </Link>
                                    </DropdownMenuItem> */}

                                    <DropdownMenuItem>
                                        <Link
                                            href={route("logout")}
                                            className="flex"
                                            method={"post"}
                                        >
                                            <LogOut className="w-5 pr-1" />
                                            Logout
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </header >
            )
            }
            <main
                className={cn(
                    "transition-all duration-100 px-10 pt-5",
                    navStatus ? "ml-16" : "ml-16 sm:ml-64"
                )}
            >
                {children}
            </main>
        </div >
    );
}
