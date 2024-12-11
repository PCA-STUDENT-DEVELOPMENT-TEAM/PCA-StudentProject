import { cn } from "@/lib/utils";

export default function ({
    headerName,
    headerFullname,
    headerContact,
    headerDesignation,
    headerType,
    children,
    className,
    contentStyle,
}: {
    headerName: string;
    headerFullname: string,
    headerContact: string,
    headerDesignation: string,
    headerType: string,
    children?: React.ReactNode;
    className?: string;
    contentStyle?: string;
}) {
    return (
        <div className={cn("relative bg-white rounded-pca", className)}>
            <div className="w-full h-[44px] bg-secondaryGreen flex items-center justify-center px-5 rounded-t-[10px] drop-shadow-customized">
                <h1 className="text-white font-bold ">{headerName}</h1>
            </div>
            <div className="w-full h-[60px] bg-secondaryGreen flex items-center justify-around px-5 rounded-b-[10px] ">
                <div className="">
                    <h1 className="text-white font-bold ">{headerFullname}</h1>
                </div>
                <div className="">
                    <h1 className="text-white font-bold ">{headerContact}</h1>
                </div>
                <div className="">
                    <h1 className="text-white font-bold ">{headerDesignation}</h1>
                </div>
                <div className="">
                    <h1 className="text-white font-bold ">{headerType}</h1>
                </div>
            </div>
            <div className={cn("p-5 flex flex-col", contentStyle)}>
                {children}
                
            </div>
        </div>
    );
}
