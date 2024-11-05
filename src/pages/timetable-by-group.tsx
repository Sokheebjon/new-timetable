import {PageHeaderSecondary} from "@/components/ui/PageHeader.tsx";
import ClassSchedule, {TColumns, TData} from "@/containers/timetable/class-schedule.tsx";
import {useTranslation} from "react-i18next";
import {useTimetableQuery} from "@/hooks/query/useTimetableQuery.ts";
import {useParams, useSearchParams} from "react-router-dom";
import {endOfWeek, format, startOfWeek} from "date-fns";
import {uz} from "date-fns/locale";
import {get} from "lodash";
import {Badge} from "@/components/ui/badge.tsx";

/* eslint-disable  @typescript-eslint/no-explicit-any */
export default function TimetableByGroup() {
    const {t} = useTranslation();
    const [searchParams] = useSearchParams();
    const params = useParams();
    const date = searchParams.get("date")
        ? new Date(searchParams.get("date") as string)
        : new Date().getTime();


    // Get the start and end of the week in timestamp (milliseconds)
    const startOfWeekInDate = startOfWeek(date, {weekStartsOn: 1});
    const endOfWeekInDate = endOfWeek(date, {weekStartsOn: 1});
    const startOfWeekTimestamp = Math.floor(Date.UTC(startOfWeekInDate.getFullYear(), startOfWeekInDate.getMonth(), startOfWeekInDate.getDate()) / 1000);
    const endOfWeekTimestamp = Math.floor(Date.UTC(endOfWeekInDate.getFullYear(), endOfWeekInDate.getMonth(), endOfWeekInDate.getDate()) / 1000);

    const timetableQuery = useTimetableQuery({
        limit: 200,
        _group: params?.groupId,
        lesson_date_from: startOfWeekTimestamp,
        lesson_date_to: endOfWeekTimestamp,
    });
    const timetableList = get(timetableQuery, 'data.data.data', []);

    const dataSources: any[] = [];

    timetableList.forEach((item: any) => {
        const index = dataSources.findIndex((data) => data.date === item.lesson_date);
        if (index === -1) {
            dataSources.push({
                lesson_date: item.lesson_date,
                [item.lessonPair.code]: {
                    subject: item.subject?.name,
                    teacher: item.employee?.name,
                    auditorium: item.auditorium,
                }
            });
        } else {
            dataSources[index] = {
                ...dataSources[index],
                lesson_date: item.lesson_date,
                [item.lessonPair.code]: {
                    subject: item.subject?.name,
                    teacher: item.employee?.name,
                    auditorium: item.auditorium,
                }
            }
        }
    });


    const lessonPairsColumns = timetableList.reduce((acc: any, item: any) => {
        const hasPairIncluded = acc.some(
            (pair: { accessor: string | number }) =>
                pair?.accessor === item.lessonPair?.code,
        );
        if (hasPairIncluded) {
            return acc;
        } else {
            acc.push({
                Header: item.lessonPair.start_time + "-" + item.lessonPair.end_time,
                accessor: item.lessonPair.code as keyof TData,
                className: 'text-center p-0',
                cell: (data: { [x: string]: any; })=> {
                    const groupData = data[item.lessonPair.code];

                    return groupData && (
                        <div className="p-2 h-32 flex m-auto justify-between items-center relative">
                            <p className="absolute left-3 top-3 border-b-2 border-destructive">
                                {groupData?.auditorium?.auditoriumType?.name}
                            </p>
                            <div className="m-auto">
                                <p className="font-semibold">
                                    {groupData?.subject}
                                </p>
                                <p className="mt-4">
                                    {groupData?.teacher}
                                </p>
                            </div>
                            <Badge className="absolute right-3 top-3" variant="destructive">
                                {groupData?.auditorium?.name}
                            </Badge>
                        </div>
                    )
                }
            });
        }
        return acc;
    }, []);

    const sortedLessonPairsColumns = lessonPairsColumns.sort((a: { accessor: number; }, b: {
        accessor: number;
    }) => (a.accessor - b.accessor));

    const columns: TColumns<TData>[] = [
        {
            Header: t("columns.date"),
            className: "w-[100px] text-center bg-gray-100",
            accessor: 'date',
            cell: (record, index, data) => {
                if (data[index - 1]?.lesson_date === record?.lesson_date) return null;
                const date = record?.lesson_date && new Date(record?.lesson_date * 1000)
                const formattedDate = date && format(date, "dd.MM.yyyy")
                const weekDayName = date && format(date, 'EEEE', {locale: uz});

                return (
                    <div>
                        {weekDayName}
                        <br/>
                        {formattedDate}
                    </div>
                )
            }
        },
        ...sortedLessonPairsColumns
    ];

    return (

        <>
            <div className="flex justify-between items-center">
                <div className="w-80">
                    <PageHeaderSecondary
                        className="text-3xl text-indigo-950 font-medium">{t('timetable.title')}
                    </PageHeaderSecondary>
                </div>
            </div>

            <div className="my-6">
                <ClassSchedule columns={columns} dataSource={dataSources}/>
            </div>
        </>

    )
}