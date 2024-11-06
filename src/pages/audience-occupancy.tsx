import {PageHeaderSecondary} from "@/components/ui/PageHeader.tsx";
import {useTranslation} from "react-i18next";
import AudienceSchedule, {TColumns, TData} from "@/containers/audience-occupancy/audience-schedule.tsx";
import {useAudienceOccupancyQuery} from "@/hooks/query/useAudienceOccupancyQuery.ts";
import {get} from "lodash";
import {startOfDay} from "date-fns";
import {useSearchParams} from "react-router-dom";
import {useTimetableQuery} from "@/hooks/query/useTimetableQuery.ts";

/* eslint-disable  @typescript-eslint/no-explicit-any */
export default function AudienceOccupancy() {
    const {t} = useTranslation();
    const [searchParams] = useSearchParams();
    const date = searchParams.get("date")
        ? new Date(searchParams.get("date") as string)
        : new Date().getTime();

    const _building = searchParams.get("building") ?? "";

    // Get the start and end of the week in timestamp (milliseconds)
    const today = startOfDay(date);
    const startOfDayTimestamp = Math.floor(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) / 1000);

    const timetableQuery = useTimetableQuery({
        limit: 200,
        lesson_date_from: startOfDayTimestamp,
        lesson_date_to: startOfDayTimestamp,
    });
    const timetableList = get(timetableQuery, 'data.data.data', []);

    const lessonPairsList = timetableList.reduce(
        (acc: any, item: any) => {
            const hasPairIncluded = acc.some(
                (pair: { code: string | number }) =>
                    pair?.code === item.lessonPair?.code,
            );
            if (hasPairIncluded) {
                return acc;
            } else {
                acc.push({...item.lessonPair});
            }
            return acc;
        },
        [],
    );
    const sortedLessonPairsList = lessonPairsList.sort(
        (a: { code: number }, b: { code: number }) => a.code - b.code,
    );

    const lessonPairColumns = sortedLessonPairsList.map((lessonPair: {
        code: string,
        start_time: string,
        end_time: string
    }) => ({
        Header: lessonPair.start_time + "-" + lessonPair.end_time,
        accessor: lessonPair.code as keyof TData,
        className: 'text-center p-0',
        cell: (data: { occupiedLessons: never[]; }) => {
            const groupNameByLessonPair = data?.occupiedLessons?.filter((item: {
                lessonPair: { code: string; };
            }) => item.lessonPair.code === lessonPair.code);
            return groupNameByLessonPair?.length > 0 && <div className="w-full h-full bg-red-50">
                {groupNameByLessonPair?.map((item: { group: { name: string, id: string } }) => (
                    <p key={item.group.id}>
                        {item.group.name},
                    </p>
                ))}
                <br/>
            </div>
        }
    }));


    const audienceOccupancyQuery = useAudienceOccupancyQuery({
        limit: 200,
        _building,
        lesson_date_from: startOfDayTimestamp,
        lesson_date_to: startOfDayTimestamp,
    });

    const audienceOccupancyList = get(audienceOccupancyQuery, 'data.data.data.items', []);

    const dataSources = audienceOccupancyList.map((item: { code: number }) => {
        const occupiedLessons = timetableList.filter((lesson: {
            auditorium: { code: number }
        }) => lesson.auditorium.code === item.code);
        return {
            ...item,
            occupiedLessons
        }
    });


    const columns: TColumns<TData>[] = [
        {
            Header: t("columns.audience"),
            className: "w-[100px] text-center bg-gray-100",
            accessor: 'audience',
            cell: (data) => {
                return data?.name
            }
        },
        {
            Header: t("columns.audience_type"),
            className: "w-[100px] text-center bg-gray-100",
            cell: (data) => {
                return data?.auditoriumType?.name
            }
        },
        {
            Header: t('columns.class_time'),
            className: 'text-center',
            children: lessonPairColumns
        },
    ]

    return (
        <>
            <div className="flex justify-between items-center">
                <PageHeaderSecondary
                    className="text-3xl text-indigo-950 font-medium">{t('audience_occupancy.title')}</PageHeaderSecondary>
            </div>

            <div className="my-6">
                <AudienceSchedule columns={columns} dataSource={dataSources}/>
            </div>
        </>
    )
}