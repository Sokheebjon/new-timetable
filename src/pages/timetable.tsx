import {useEffect, useState} from "react";
import {PageHeaderSecondary} from "@/components/ui/PageHeader.tsx";
import {useTranslation} from "react-i18next";
import EducationFormTabs from "@/containers/timetable/education-form-tabs.tsx";
import CourseSelectionCheckbox from "@/containers/timetable/course-selection-checkbox.tsx";
import ClassSchedule, {TColumns, TData} from "@/containers/timetable/class-schedule.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useTimetableQuery} from "@/hooks/query/useTimetableQuery.ts";
import {get} from "lodash";
import {useFacultiesQuery} from "@/hooks/query/useFacultiesQuery.ts";
import {endOfWeek, format, startOfWeek} from "date-fns";
import {useSearchParams} from "react-router-dom";
import {uz} from "date-fns/locale";
import {useCoursesQuery} from "@/hooks/query/useCoursesQuery.ts";
import {Badge} from "@/components/ui/badge.tsx";

export default function Timetable() {
    const {t} = useTranslation();
    const [facultyId, setFacultyId] = useState<string | number | null>(null)
    const [educationForm, setEducationForm] = useState<string | number>(11)
    const [searchParams] = useSearchParams();
    const date = searchParams.get("date")
        ? new Date(searchParams.get("date") as string)
        : new Date().getTime();

    const facultiesQuery = useFacultiesQuery({limit: 200})
    const facultiesList = get(facultiesQuery, "data.data.data.data.items", []);

    // Get the start and end of the week in timestamp (milliseconds)
    const startOfWeekInDate = startOfWeek(date, {weekStartsOn: 1});
    const endOfWeekInDate = endOfWeek(date, {weekStartsOn: 1});
    const startOfWeekTimestamp = Math.floor(Date.UTC(startOfWeekInDate.getFullYear(), startOfWeekInDate.getMonth(), startOfWeekInDate.getDate()) / 1000);
    const endOfWeekTimestamp = Math.floor(Date.UTC(endOfWeekInDate.getFullYear(), endOfWeekInDate.getMonth(), endOfWeekInDate.getDate()) / 1000);

    const [semesterCodes, setSemesterCodes] = useState<string[]>([])

    const timetableQuery = useTimetableQuery({
        limit: 200,
        _educationForm: educationForm,
        _department: facultyId,
        lesson_date_from: startOfWeekTimestamp,
        lesson_date_to: endOfWeekTimestamp,
        _semester: semesterCodes
    }, {enabled: facultiesQuery.isSuccess})
    const timetableList = get(timetableQuery, "data.data.data", [])

    const groupsList = timetableList.reduce((acc, item: any) => {
        const hasThisGroupIncluded = acc.some((group: { id: string }) => group.id === item.group.id)
        if (hasThisGroupIncluded) {
            return acc
        } else {
            acc.push({...item.group} as never)
        }
        return acc
    }, [])

    const groupChildren = groupsList.map((group: {
        name: string,
        id: string,
        specialty: { name: string, id: string }
    }) => ({
        Header: (
            <>
                <Button variant="link">
                    {group.name}
                </Button>
            </>
        ),
        accessor: group.id as keyof TData,
        className: 'w-[400px] text-center',
        cell: (record: { lessonsByGroup: any[]; }) => {
            const groupData = record?.lessonsByGroup.find((item) => item?.group?.id === group.id)

            return groupData && (
                <div className="p-2 w-64 h-32 flex justify-between relative">
                    <p className="absolute left-0 top-0 border-b-2 border-destructive">
                        {groupData?.auditorium?.auditoriumType?.name}
                    </p>
                    <div className="m-auto">
                        <p className="font-semibold">
                            {groupData?.subject?.name}
                        </p>
                        <p className="mt-4">
                            {groupData?.employee?.name}
                        </p>
                    </div>
                    <Badge className="absolute right-0 top-0" variant="destructive">
                        {groupData?.auditorium?.name}
                    </Badge>
                </div>
            )
        }
    }))


    const columns: TColumns<TData>[] = [
        {
            Header: t("columns.date"),
            className: "w-[100px]",
            accessor: 'date',
            rowSpan: 3,
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
        {
            Header: t("columns.class_time"),
            className: "w-[170px] text-center bg-gray-100",
            accessor: 'classTime',
            cell: (data) => {
                return <div className="w-[80px]">
                    {data?.lessonPair?.start_time + "-" + data?.lessonPair?.end_time}
                </div>
            }
        },
        {
            Header: t('columns.group'),
            className: 'text-center',
            children: groupChildren,
        },
    ]

    const coursesQuery = useCoursesQuery()
    const coursesList = get(coursesQuery, "data.data.data", []);
    const coursesOptions = coursesList.map((course: { level: { name: string }, codes: string[] }) => ({
        label: course.level.name,
        value: JSON.stringify(course.codes)
    }));


    // const dataSources = timetableList.reduce((acc: any, item: any, index) => {
    //     const hasThisDayIncluded = acc.some((day: { lesson_date: number }) => day.lesson_date === item.lesson_date);
    //
    //     if (hasThisDayIncluded) {
    //         acc[index]?.lessonsByGroup.push(item);
    //         return acc
    //     }
    //     return [...acc, item]
    // }, [])

    const dataSources: any[] = [];

    timetableList.forEach((item: any) => {
        const hasThisDayIncluded = dataSources.some((day: any) => {
            return day.lesson_date === item.lesson_date && day.lessonPair.code === item.lessonPair.code
        });
        if (hasThisDayIncluded) {
            const dayIndex = dataSources.findIndex((day: any) => day.lesson_date === item.lesson_date && day.lessonPair.code === item.lessonPair.code);
            dataSources[dayIndex].lessonsByGroup.push(item);
        } else {
            dataSources.push({
                lesson_date: item.lesson_date,
                lessonPair: item.lessonPair,
                lessonsByGroup: [item]
            });
        }
    });

    const sortedDataSources = dataSources.sort((a, b) => {
        if (a.lesson_date !== b.lesson_date) {
            return a.lesson_date - b.lesson_date
        } else {
            return a.lessonPair.code - b.lessonPair.code
        }
    })

    const facultiesOptions = facultiesList.map((faculty: { name: string, id: string }) => ({
        label: faculty.name,
        value: faculty.id
    }));

    const tabList = [
        {
            value: "11",
            label: t('timetable.day')
        },
        {
            value: "13",
            label: t('timetable.correspondence')
        },
        {
            value: "12",
            label: t('timetable.evening')
        }
    ]

    const handleChangeFaculties = (value: string) => {
        setFacultyId(value)
    }

    const handleChangeEducationForm = (value: string) => {
        setEducationForm(value)
    }

    const handleValueChange = (value: string) => {
        setSemesterCodes(JSON.parse(value))
    }

    return (
        <>
            <div className="flex justify-between items-center">
                <PageHeaderSecondary
                    className="text-3xl text-indigo-950 font-medium">{t('timetable.title')}
                </PageHeaderSecondary>
                {facultiesOptions.length > 0 &&
                    <EducationFormTabs
                        onChange={handleChangeFaculties}
                        tabList={facultiesOptions}
                        defaultValue={facultiesOptions[0]?.value}
                    />
                }
                <EducationFormTabs onChange={handleChangeEducationForm} tabList={tabList}
                                   defaultValue={tabList[0].value}/>
                <CourseSelectionCheckbox
                    onValueChange={handleValueChange}
                    courseList={coursesOptions}
                    defaultValue={coursesOptions[0]?.value}
                />
            </div>

            <div className="my-6">
                <ClassSchedule columns={columns} dataSource={sortedDataSources}/>
            </div>
        </>
    )
}
