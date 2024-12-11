import { CircleAlert } from "lucide-react";

const ToastError = () => {
    return (
        <>
            <div className=" text-red-600 flex-col">
                <div className="flex items-center">
                    <CircleAlert className="h-4" />
                    <span className="text-base">Error!</span>
                </div>
                <div className="flex">
                    <span className="pl-6">Please try again...</span>
                </div>
            </div>
            ,
        </>
    );
};

export default ToastError;
