import {useState} from "react";
import {PageHeaderSecondary} from "@/components/ui/PageHeader.tsx";
import {useTranslation} from "react-i18next";
import CourseSelectionCheckbox from "@/containers/timetable/course-selection-checkbox.tsx";
import ClassSchedule, {TColumns, TData} from "@/containers/timetable/class-schedule.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useTimetableQuery} from "@/hooks/query/useTimetableQuery.ts";
import {get} from "lodash";
import {useFacultiesQuery} from "@/hooks/query/useFacultiesQuery.ts";
import {endOfWeek, format, startOfWeek} from "date-fns";
import {useNavigate, useSearchParams} from "react-router-dom";
import {uz} from "date-fns/locale";
import {useCoursesQuery} from "@/hooks/query/useCoursesQuery.ts";
import {Badge} from "@/components/ui/badge.tsx";
import {useGroupsQuery} from "@/hooks/query/useGroupsQuery.ts";
import EducationFormTabs from "@/containers/timetable/education-form-tabs.tsx";

/* eslint-disable  @typescript-eslint/no-explicit-any */
export default function Timetable() {
    const {t} = useTranslation();
    const [facultyId, setFacultyId] = useState<string | number | null>(null);
    const [educationForm, setEducationForm] = useState<string | number>(11)
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
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

    const groupQuery = useGroupsQuery({
        limit: 200,
        _education_form: educationForm,
        _department: facultyId
    })
    const groupList = get(groupQuery, "data.data.data.data.items", []);

    const groupIds = groupList.map((group: { id: string }) => group.id)

    const timetableQuery = useTimetableQuery({
        limit: 200,
        _education_form: educationForm,
        _faculty: facultyId,
        lesson_date_from: startOfWeekTimestamp,
        lesson_date_to: endOfWeekTimestamp,
        _semester: semesterCodes,
        _group: groupIds
    }, {
        enabled: !!facultyId && !!groupIds.length
    });

    const timetableList = get(timetableQuery, "data.data.data", []);

    // const specialityQuery = useSpecialityListQuery({limit: 200, _department: facultyId});

    // const specialityList = get(specialityQuery, "data.data.data.data.items", []);

    // const specialityOptions = specialityList.map((speciality: { name: string, id: string }) => ({
    //     label: speciality.name,
    //     value: speciality.id
    // }));

    // const groupsList = timetableList.reduce((acc, item: any) => {
    //     const hasThisGroupIncluded = acc.some((group: { id: string }) => group.id === item.group.id)
    //     if (hasThisGroupIncluded) {
    //         return acc
    //     } else {
    //         acc.push({...item.group} as never)
    //     }
    //     return acc
    // }, [])

    const handleClickGroup = (id: string)=> () => {
        navigate(`/timetable/${id}`)
    }

    const groupChildren = groupList.map((group: {
        name: string,
        id: string,
        specialty: { name: string, id: string }
    }) => ({
        Header: (
            <>
                <Button onClick={handleClickGroup(group.id)} variant="link">
                    {group.name}
                </Button>
                <p className="text-xs">
                    {group.specialty.name}
                </p>
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
            className: "w-[100px] text-center bg-gray-100",
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
                return <div className="w-full">
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

    const coursesQuery = useCoursesQuery({}, {staleTime: 600000})
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

    // const handleChangeSpecialities = (value: string) => {
    //     setSpecialityId(value)
    // }

    const handleChangeEducationForm = (value: string) => {
        setEducationForm(value)
    }

    const handleValueChange = (value: string) => {
        setSemesterCodes(JSON.parse(value))
    }

    return (
        <>
            <div className="flex justify-between items-center">
                <div className="w-80">
                    <PageHeaderSecondary
                        className="text-3xl text-indigo-950 font-medium">{t('timetable.title')}
                    </PageHeaderSecondary>
                </div>
                <EducationFormTabs
                    tabList={facultiesOptions}
                    onChange={handleChangeFaculties}
                    // placeholder={t("timetable.faculties")}
                />
                {/*<Select*/}
                {/*    className="w-[300px]"*/}
                {/*    contentClassName="w-[300px]"*/}
                {/*    options={specialityOptions}*/}
                {/*    disabled={!facultyId}*/}
                {/*    onValueChange={handleChangeSpecialities}*/}
                {/*    placeholder={t("timetable.specialities")}*/}
                {/*/>*/}
                <EducationFormTabs
                    tabList={tabList}
                    defaultValue={tabList[0].value}
                    // disabled={!facultyId}
                    onChange={handleChangeEducationForm}
                    // placeholder={t("timetable.education_form")}
                />

                <CourseSelectionCheckbox
                    onValueChange={handleValueChange}
                    courseList={coursesOptions}
                    defaultValue={coursesOptions[0]?.value}
                />

            </div>

            <div className="my-6">
                <ClassSchedule  columns={columns} dataSource={sortedDataSources}/>
            </div>
        </>
    )
}
