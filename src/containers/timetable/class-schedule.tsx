import {ReactNode} from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";

export interface TChildren<TChildData> {
    Header: string | ReactNode
    accessor: keyof TChildData
    className: string
}

export interface TData {
    date?: string
    classTime?: string
    financial: string
    initialEducation: string
    initialEducation_2: string
    foreignLanguage: string
    psychology: string;
}

export interface TColumns<TData> {
    Header: string | ReactNode
    accessor?: keyof TData
    className: string
    children?: TChildren<TData>[]
    rowSpan?: number
}

interface ClassScheduleProps {
    columns: TColumns<TData>[]
    dataSource: TData[]
}

export default function ClassSchedule({columns, dataSource}: ClassScheduleProps) {

    const flattenColumns: TColumns<TData>[] = columns.reduce((acc, item) => {
        if (item.children) {
            return [...acc, ...item.children]
        }
        return [...acc, item]
    }, [] as TColumns<TData>[])

    return (
        <Table className="class-schedule overflow-x-auto">
            <TableHeader>
                <TableRow>
                    {
                        columns.map((column, index) => {
                            const hasChildren = columns.some(col => col.children);
                            const rowSpan = !column.children && hasChildren ? 2 : 1;

                            return (
                                <TableHead rowSpan={rowSpan} colSpan={column?.children?.length} key={index}
                                           className={column.className}>
                                    {column.Header}
                                </TableHead>
                            )
                        })
                    }
                </TableRow>
                <TableRow>
                    {
                        columns.map((column) => {
                            return column.children?.map((childCol, index) => {
                                return (
                                    <TableHead key={index} className={childCol.className}>
                                        {childCol.Header}
                                    </TableHead>
                                )
                            })
                        })
                    }
                </TableRow>
            </TableHeader>
            <TableBody className="overflow-y-auto">
                {dataSource.map((data, index) => {
                    const shouldRenderDateCell = index % 3 === 0; // Render date cell every 3 rows
                    return (
                        <TableRow key={index}>
                            {/* Only render the date cell every 3 rows */}
                            {shouldRenderDateCell && (
                                <TableCell rowSpan={3} className="w-[100px] bg-gray-100">
                                    {data.date}
                                </TableCell>
                            )}
                            {flattenColumns.slice(1).map((column, indx) => (
                                <TableCell key={indx} className={column.className}>
                                    {column.accessor && data[column.accessor as keyof TData]}
                                </TableCell>
                            ))}
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    )
}