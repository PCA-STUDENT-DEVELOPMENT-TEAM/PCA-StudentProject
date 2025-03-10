import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import {
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    Pagination,
} from "./ui/pagination";
import { cn } from "@/lib/utils";

const PaginationTable = ({ table }: { table: any }) => {
    return (
        <Pagination className="flex justify-end items-end my-3">
            <PaginationContent>
                <PaginationItem>
                    <Button
                        onClick={table.previousPage}
                        className="bg-transparent text-black hover:bg-transparent w-30 p-2"
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronLeft className="pr-1" />
                        Previous
                    </Button>
                </PaginationItem>
                {table.getPageCount() > 1 &&
                    Array.from({ length: table.getPageCount() }, (_, index) => (
                        <PaginationItem key={index}>
                            <PaginationLink
                                onClick={() => table.setPageIndex(index)}
                                className={cn(
                                    table.getState().pagination.pageIndex === index &&
                                    "font-bold bg-primary text-white"
                                )}
                            >
                                {index + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                <Button
                    onClick={table.nextPage}
                    className="bg-transparent text-black hover:bg-transparent w-30 p-2"
                    disabled={!table.getCanNextPage()}
                >
                    Next
                    <ChevronRight className="pl-1" />
                </Button>
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationTable;
