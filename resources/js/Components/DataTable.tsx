import {
    Table as CnTable,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { cn } from "@/lib/utils";
import { sslProfileTypes } from "@/types/payrollPagesTypes";

import { ColumnDef, flexRender, Table } from "@tanstack/react-table";

interface DataTableProps<TData, TValue> {
    headerStyle?: string;
    rowStyle?: string;
    table: Table<any>;
    className?: string;
}

export function DataTable<TData, TValue>({
    headerStyle,
    rowStyle,
    table,
    className,
}: DataTableProps<TData, TValue>) {
    return (
        <div className="h-full">
            <div
                className={cn("rounded-[5px] border shadow-md overflow-hidden")}
            >
                <CnTable className={cn("bg-baseGrey h-full ", className)}>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup: any) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header: any) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className={headerStyle}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row: any) => (
                                <TableRow
                                    className={rowStyle}
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell: any) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={table.getAllColumns().length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </CnTable>
            </div>
        </div>
    );
}
