import {PageHeaderSecondary} from "@/components/ui/PageHeader.tsx";
import {useTranslation} from "react-i18next";
import EducationFormTabs from "@/containers/timetable/education-form-tabs.tsx";
import CourseSelectionCheckbox from "@/containers/timetable/course-selection-checkbox.tsx";
import ClassSchedule, {TColumns, TData} from "@/containers/timetable/class-schedule.tsx";
import {Button} from "@/components/ui/button.tsx";

export default function Timetable() {
    const {t} = useTranslation();

    const columns: TColumns<TData>[] = [
        {
            Header: t("columns.date"),
            className: "w-[100px]",
            accessor: 'date',
            rowSpan: 3
        },
        {
            Header: t("columns.class_time"),
            className: "w-[100px] text-center bg-gray-100",
            accessor: 'classTime',
        },
        {
            Header: t('columns.group'),
            className: 'text-center',
            children: [
                {
                    Header: (
                        <>
                            <Button variant="link">
                                46-24 MMT (o‘z)
                            </Button>
                            <br/>
                            Moliya va moliyaviy texnologiyalar
                        </>
                    ),
                    accessor: 'financial',
                    className: 'text-center'
                },
                {
                    Header: (
                        <>
                            <Button variant="link">
                                46-24 MMT (o‘z)
                            </Button>
                            <br/>
                            Boshlang‘ich taʼlim
                        </>
                    ),
                    accessor: 'initialEducation',
                    className: 'text-center'
                },
                {
                    Header: (
                        <>
                            <Button variant="link">
                                46-24 MMT (o‘z)
                            </Button>
                            <br/>
                            Boshlang‘ich taʼlim
                        </>
                    ),
                    accessor: 'initialEducation_2',
                    className: 'text-center'
                },
                {
                    Header: (
                        <>
                            <Button variant="link">
                                46-24 MMT (o‘z)
                            </Button>
                            <br/>
                            Xorijiy til va adabiyoti
                        </>
                    ),
                    accessor: 'foreignLanguage',
                    className: 'text-center'
                },
                {
                    Header: (
                        <>
                            <Button variant="link">
                                46-24 MMT (o‘z)
                            </Button>
                            <br/>
                            Psixologiya
                        </>
                    ),
                    accessor: 'psychology',
                    className: 'text-center'
                },
            ]
        },
    ]

    const dataSource = [
        {
            date: "Dushanba",
            classTime: "08:00-09:30",
            financial: "Ilk va maktabgacha yoshdagi bolalar pedagogikasi",
            initialEducation: "Ona tili",
            initialEducation_2: "Amaliy o‘zbek (rus) tili. Davlat tilida ish yuritish (ECTS 6)",
            foreignLanguage: "Ingliz tili",
            psychology: "Psixologiya"
        },
        {
            classTime: "09:40-11:10",
            financial: "Ilk va maktabgacha yoshdagi bolalar pedagogikasi",
            initialEducation: "Ona tili",
            initialEducation_2: "Amaliy o‘zbek (rus) tili. Davlat tilida ish yuritish (ECTS 6)",
            foreignLanguage: "Ingliz tili",
            psychology: "Psixologiya"
        },
        {
            classTime: "11:20-12:50",
            financial: "Ilk va maktabgacha yoshdagi bolalar pedagogikasi",
            initialEducation: "Ona tili",
            initialEducation_2: "Amaliy o‘zbek (rus) tili. Davlat tilida ish yuritish (ECTS 6)",
            foreignLanguage: "Ingliz tili",
            psychology: "Psixologiya"
        },
        {
            date: "Seshanba",
            classTime: "08:00-09:30",
            financial: "Ilk va maktabgacha yoshdagi bolalar pedagogikasi",
            initialEducation: "Ona tili",
            initialEducation_2: "Amaliy o‘zbek (rus) tili. Davlat tilida ish yuritish (ECTS 6)",
            foreignLanguage: "Ingliz tili",
            psychology: "Psixologiya"
        },
        {
            classTime: "09:40-11:10",
            financial: "Ilk va maktabgacha yoshdagi bolalar pedagogikasi",
            initialEducation: "Ona tili",
            initialEducation_2: "Amaliy o‘zbek (rus) tili. Davlat tilida ish yuritish (ECTS 6)",
            foreignLanguage: "Ingliz tili",
            psychology: "Psixologiya"
        },
        {
            classTime: "11:20-12:50",
            financial: "Ilk va maktabgacha yoshdagi bolalar pedagogikasi",
            initialEducation: "Ona tili",
            initialEducation_2: "Amaliy o‘zbek (rus) tili. Davlat tilida ish yuritish (ECTS 6)",
            foreignLanguage: "Ingliz tili",
            psychology: "Psixologiya"
        },
        {
            date: "Chorshanba",
            classTime: "08:00-09:30",
            financial: "Ilk va maktabgacha yoshdagi bolalar pedagogikasi",
            initialEducation: "Ona tili",
            initialEducation_2: "Amaliy o‘zbek (rus) tili. Davlat tilida ish yuritish (ECTS 6)",
            foreignLanguage: "Ingliz tili",
            psychology: "Psixologiya"
        },
        {
            classTime: "09:40-11:10",
            financial: "Ilk va maktabgacha yoshdagi bolalar pedagogikasi",
            initialEducation: "Ona tili",
            initialEducation_2: "Amaliy o‘zbek (rus) tili. Davlat tilida ish yuritish (ECTS 6)",
            foreignLanguage: "Ingliz tili",
            psychology: "Psixologiya"
        },
        {
            classTime: "11:20-12:50",
            financial: "Ilk va maktabgacha yoshdagi bolalar pedagogikasi",
            initialEducation: "Ona tili",
            initialEducation_2: "Amaliy o‘zbek (rus) tili. Davlat tilida ish yuritish (ECTS 6)",
            foreignLanguage: "Ingliz tili",
            psychology: "Psixologiya"
        },
        {
            date: "Payshanba",
            classTime: "08:00-09:30",
            financial: "Ilk va maktabgacha yoshdagi bolalar pedagogikasi",
            initialEducation: "Ona tili",
            initialEducation_2: "Amaliy o‘zbek (rus) tili. Davlat tilida ish yuritish (ECTS 6)",
            foreignLanguage: "Ingliz tili",
            psychology: "Psixologiya"
        },
        {
            classTime: "09:40-11:10",
            financial: "Ilk va maktabgacha yoshdagi bolalar pedagogikasi",
            initialEducation: "Ona tili",
            initialEducation_2: "Amaliy o‘zbek (rus) tili. Davlat tilida ish yuritish (ECTS 6)",
            foreignLanguage: "Ingliz tili",
            psychology: "Psixologiya"
        },
        {
            classTime: "11:20-12:50",
            financial: "Ilk va maktabgacha yoshdagi bolalar pedagogikasi",
            initialEducation: "Ona tili",
            initialEducation_2: "Amaliy o‘zbek (rus) tili. Davlat tilida ish yuritish (ECTS 6)",
            foreignLanguage: "Ingliz tili",
            psychology: "Psixologiya"
        },
        {
            date: "Juma",
            classTime: "08:00-09:30",
            financial: "Ilk va maktabgacha yoshdagi bolalar pedagogikasi",
            initialEducation: "Ona tili",
            initialEducation_2: "Amaliy o‘zbek (rus) tili. Davlat tilida ish yuritish (ECTS 6)",
            foreignLanguage: "Ingliz tili",
            psychology: "Psixologiya"
        },
        {
            classTime: "09:40-11:10",
            financial: "Ilk va maktabgacha yoshdagi bolalar pedagogikasi",
            initialEducation: "Ona tili",
            initialEducation_2: "Amaliy o‘zbek (rus) tili. Davlat tilida ish yuritish (ECTS 6)",
            foreignLanguage: "Ingliz tili",
            psychology: "Psixologiya"
        },
        {
            classTime: "11:20-12:50",
            financial: "Ilk va maktabgacha yoshdagi bolalar pedagogikasi",
            initialEducation: "Ona tili",
            initialEducation_2: "Amaliy o‘zbek (rus) tili. Davlat tilida ish yuritish (ECTS 6)",
            foreignLanguage: "Ingliz tili",
            psychology: "Psixologiya"
        },
        {
            date: "Shanba",
            classTime: "08:00-09:30",
            financial: "Ilk va maktabgacha yoshdagi bolalar pedagogikasi",
            initialEducation: "Ona tili",
            initialEducation_2: "Amaliy o‘zbek (rus) tili. Davlat tilida ish yuritish (ECTS 6)",
            foreignLanguage: "Ingliz tili",
            psychology: "Psixologiya"
        },
        {
            classTime: "09:40-11:10",
            financial: "Ilk va maktabgacha yoshdagi bolalar pedagogikasi",
            initialEducation: "Ona tili",
            initialEducation_2: "Amaliy o‘zbek (rus) tili. Davlat tilida ish yuritish (ECTS 6)",
            foreignLanguage: "Ingliz tili",
            psychology: "Psixologiya"
        },
        {
            classTime: "11:20-12:50",
            financial: "Ilk va maktabgacha yoshdagi bolalar pedagogikasi",
            initialEducation: "Ona tili",
            initialEducation_2: "Amaliy o‘zbek (rus) tili. Davlat tilida ish yuritish (ECTS 6)",
            foreignLanguage: "Ingliz tili",
            psychology: "Psixologiya"
        },
    ]

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

            <div className="my-6">
                <ClassSchedule columns={columns} dataSource={dataSource}/>
            </div>
        </>
    )
}