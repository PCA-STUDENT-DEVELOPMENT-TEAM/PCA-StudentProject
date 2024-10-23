import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
} from "@/Components/ui/pagination";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DataTable } from "./DataTable";

const PCATable = ({
    table,
    columns,
    pagination = true,
}: {
    table: any;
    columns: any;
    pagination?: boolean;
}) => {
    const pageIndex = table.getState().pagination.pageIndex;
    return (
        <div className="h-full flex flex-grow flex-col">
            <div className="flex-1">
                <DataTable
                    columns={columns}
                    rowStyle="odd:bg-white even:bg-transparent text-center"
                    table={table}
                />
            </div>
            {pagination && (
                <Pagination className="flex justify-end">
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
                            <PaginationLink className="bg-baseGreen text-white cursor-default">
                                {pageIndex + 1}
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                        <Button
                            onClick={table.nextPage}
                            className="bg-transparent text-black hover:bg-transparent w-30 p-5"
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                            <ChevronRight className="pl-1" />
                        </Button>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
};

export default PCATable;
