import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import {
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    Pagination,
} from "./ui/pagination";

const PaginationTable = ({ table }: { table: any }) => {
    return (
        <Pagination className="flex justify-end items-end mb-3">
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
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink>
                        {table.getState().pagination.pageIndex + 1}
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>
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
