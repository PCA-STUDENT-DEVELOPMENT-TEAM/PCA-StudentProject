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

export default function Modal({
    children,
    title,
    trigger,
    description,
    open,
    openDialog,
}: {
    children?: ReactNode;
    title?: string;
    trigger?: ReactNode;
    description?: string;
    open?: boolean;
    openDialog?: any;
}) {
    return (
        <Dialog open={open} onOpenChange={openDialog}>
            <DialogTrigger>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                    {children}
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
