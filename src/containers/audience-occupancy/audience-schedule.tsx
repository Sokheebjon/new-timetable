import {ReactNode} from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {useTranslation} from "react-i18next";

export interface TChildren<TChildData> {
    Header: string | ReactNode
    accessor: keyof TChildData
    className: string
}

export interface TData {
    name: string
    audience?: string
    auditoriumType?: {
        name: string
        code: string
    }
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
    cell?: (data: TData, index: number) => ReactNode | string | number | null
}

interface ClassScheduleProps {
    columns: TColumns<TData>[]
    dataSource: TData[]
    loading?: boolean
}

export default function AudienceSchedule({columns, dataSource, loading}: ClassScheduleProps) {
    const {t} = useTranslation();
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
                    {columns.map((column) => {
                        return column.children?.map((childCol, index) => {
                            return (
                                <TableHead key={index} className={childCol.className}>
                                    {childCol.Header}
                                </TableHead>
                            )
                        })
                    })}
                </TableRow>
            </TableHeader>
            <TableBody className="overflow-y-auto">
                {
                    loading ? (
                        <TableRow>
                            <TableCell colSpan={flattenColumns.length} className="text-center">
                                {t('loading')}
                            </TableCell>
                        </TableRow>
                    ) : dataSource.map((data, index) => {
                        return (
                            <TableRow key={index}>
                                {flattenColumns.map((column, indx) => (
                                    <TableCell key={indx} className={column.className}>
                                        {column.cell ? column.cell(data, index) : data[column.accessor as keyof TData]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        );
                    })
                }
            </TableBody>
        </Table>
    )
}