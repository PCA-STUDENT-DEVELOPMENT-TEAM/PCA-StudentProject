import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import { ReactNode } from "react";

{
    /* Dialog Component Usage : 
                                props : 
                                trigger (React Node type) required
                                title string optional
                                description string optional
                                children react node optional
                                  */
}

export default function ({
    children,
    title,
    trigger,
    description,
    open,
    openDialog,
    dialogClassName,
}: {
    children?: ReactNode;
    title?: string;
    trigger?: ReactNode;
    description?: string;
    open?: boolean;
    openDialog?: any;
    dialogClassName?: string;
}) {
    return (
        <Dialog open={open} onOpenChange={openDialog}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent className={dialogClassName}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                    {children}
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
