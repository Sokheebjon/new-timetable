import {ReactNode} from "react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {useTranslation} from "react-i18next";

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
    lessonPair?: { start_time: string, end_time: string, code: string }
    lesson_date?: number;
}

export interface TColumns<TData> {
    Header: string | ReactNode
    accessor?: keyof TData
    className: string
    children?: TChildren<TData>[]
    rowSpan?: number
    width?: string
    height?: string
    cell?: (data: TData, index: number, dataSource: TData[]) => ReactNode | string | number | null
}

interface ClassScheduleProps {
    columns: TColumns<TData>[]
    dataSource: TData[]
    loading?: boolean
}

export default function ClassSchedule({columns, dataSource, loading}: ClassScheduleProps) {
    const date = new Date();
    const {t} = useTranslation()
    const todayInTimestamp = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 1000;

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
            <TableBody className="overflow-y-auto min-h-80">
                {loading && (
                    <TableRow className="h-72">
                        <TableCell colSpan={flattenColumns.length+1} className="text-center">{t('loading')}</TableCell>
                    </TableRow>
                )}
                {dataSource.length === 0 && (
                    <TableRow className="h-72">
                        <TableCell colSpan={flattenColumns.length+1} className="text-center">{t('timetable.no_data')}</TableCell>
                    </TableRow>
                )}
                {dataSource.map((data, index) => {
                    // const shouldRenderDateCell = index % 3 === 0; // Render date cell every 3 rows
                    // const initalRowFlattenColumns = flattenColumns[0];
                    return (
                        <TableRow id={String(data?.lesson_date)} className={todayInTimestamp === data?.lesson_date ? "bg-red-50" : ""} key={index}>
                            {/* Only render the date cell every 3 rows */}
                            {/*{shouldRenderDateCell && (*/}
                            {/*    <TableCell rowSpan={3} className="w-[100px] bg-gray-100">*/}
                            {/*        {initalRowFlattenColumns.cell ? flattenColumns?.[0]?.cell?.(data, index) : data?.[initalRowFlattenColumns.accessor as keyof TData]}*/}
                            {/*    </TableCell>*/}
                            {/*)}*/}
                            {flattenColumns.map((column, indx) => (
                                <TableCell style={{width: column.width, height: column.height}} key={indx}
                                           className={column.className}>
                                    {column.cell ? column.cell(data, index, dataSource) as any : data[column.accessor as keyof TData]}
                                </TableCell>
                            ))}
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    )
}