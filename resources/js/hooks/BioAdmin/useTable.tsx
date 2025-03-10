import { useState } from "react";
import {
    ColumnDef,
    getCoreRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table";

type UseTableProps<T> = {
    data: T[];
    columns: ColumnDef<T>[];
    initialPageSize?: number;
};

export function useTable<T>({ data, columns, initialPageSize = 12 }: UseTableProps<T>) {
    const [globalFilter, setGlobalFilter] = useState<string>("");

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        initialState: {
            pagination: { pageSize: initialPageSize },
        },
        state: { globalFilter },
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: "auto",
    });

    return { table, globalFilter, setGlobalFilter };
}
