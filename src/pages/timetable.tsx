import {PageHeaderSecondary} from "@/components/ui/PageHeader.tsx";
import {useTranslation} from "react-i18next";
import EducationFormTabs from "@/containers/timetable/education-form-tabs.tsx";
import CourseSelectionCheckbox from "@/containers/timetable/course-selection-checkbox.tsx";
import {DataTable} from "@/components/DataTable/DataTable.tsx";

export default function Timetable() {
    const {t} = useTranslation()

    const tabList = [
        {
            value: 'Kunduzgi',
            label: t('timetable.day')
        },
        {
            value: 'Sirtqi',
            label: t('timetable.correspondence')
        },
        {
            value: 'Kechki',
            label: t('timetable.evening')
        }
    ]

    const courseList = [1, 2, 3, 4]

    const handleValueChange = (value: string) => {
        console.log(value)
    }

    const columns = [
        {
            accessorKey: "count",
            header: "count",
        },
        {
            accessorKey: "group",
            header: "group",
        },
        {
            accessorKey: "course",
            header: "course",
        },
        {
            accessorKey: "get",
            header: "get",
        }
    ]

    const data = [
        {}
    ]

    return (
        <>
            <div className="flex justify-between items-center">
                <PageHeaderSecondary
                    className="text-3xl text-indigo-950 font-medium">{t('timetable.title')}</PageHeaderSecondary>
                <EducationFormTabs tabList={tabList} defaultValue={tabList[0].value}/>
                <CourseSelectionCheckbox
                    onValueChange={handleValueChange}
                    courseList={courseList}
                    defaultValue={String(courseList[0])}
                />
            </div>

            <div className="py-4">
                <DataTable columns={columns} data={data}/>
            </div>
        </>
    )
}
