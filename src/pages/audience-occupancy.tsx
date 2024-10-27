import {PageHeaderSecondary} from "@/components/ui/PageHeader.tsx";
import {useTranslation} from "react-i18next";
import AudienceSchedule, {TColumns, TData} from "@/containers/audience-occupancy/audience-schedule.tsx";

export default function AudienceOccupancy() {
    const {t} = useTranslation();

    const columns: TColumns<TData>[] = [
        {
            Header: t("columns.audience"),
            className: "w-[100px] text-center bg-gray-100",
            accessor: 'audience',
            rowSpan: 3
        },
        {
            Header: t("columns.audience_type"),
            className: "w-[100px] text-center bg-gray-100",
            accessor: 'audience_type',
        },
        {
            Header: t('columns.class_time'),
            className: 'text-center',
            children: [
                {
                    Header: "08:00-09:30",
                    accessor: 'financial',
                    className: 'text-center'
                },
                {
                    Header: "09:40-11:10",
                    accessor: 'initialEducation',
                    className: 'text-center'
                },
                {
                    Header: "11:20-12:50",
                    accessor: 'initialEducation_2',
                    className: 'text-center'
                },
                {
                    Header: "13:00-14:30",
                    accessor: 'foreignLanguage',
                    className: 'text-center'
                },
                {
                    Header: "14:40-16:10",
                    accessor: 'psychology',
                    className: 'text-center'
                },
                {
                    Header: "16:20-17:50",
                    accessor: 'psychology',
                    className: 'text-center'
                },
                {
                    Header: "18:00-19:30",
                    accessor: 'psychology',
                    className: 'text-center'
                },
            ]
        },
    ]

    const dataSource = [
        {
            audience: "201",
            audience_type: "Маъруза хонаси",
            financial: "Ilk va maktabgacha yoshdagi bolalar pedagogikasi",
            initialEducation: "Ona tili",
            initialEducation_2: "Amaliy o‘zbek (rus) tili. Davlat tilida ish yuritish (ECTS 6)",
            foreignLanguage: "Ingliz tili",
            psychology: "Psixologiya"
        },
        {
            audience: "201",
            audience_type: "Маъруза хонаси",
            financial: "Ilk va maktabgacha yoshdagi bolalar pedagogikasi",
            initialEducation: "Ona tili",
            initialEducation_2: "Amaliy o‘zbek (rus) tili. Davlat tilida ish yuritish (ECTS 6)",
            foreignLanguage: "Ingliz tili",
            psychology: "Psixologiya"
        },
        {
            audience: "201",
            audience_type: "Маъруза хонаси",
            financial: "Ilk va maktabgacha yoshdagi bolalar pedagogikasi",
            initialEducation: "Ona tili",
            initialEducation_2: "Amaliy o‘zbek (rus) tili. Davlat tilida ish yuritish (ECTS 6)",
            foreignLanguage: "Ingliz tili",
            psychology: "Psixologiya"
        },
        {
            audience: "201",
            audience_type: "Маъруза хонаси",
            financial: "Ilk va maktabgacha yoshdagi bolalar pedagogikasi",
            initialEducation: "Ona tili",
            initialEducation_2: "Amaliy o‘zbek (rus) tili. Davlat tilida ish yuritish (ECTS 6)",
            foreignLanguage: "Ingliz tili",
            psychology: "Psixologiya"
        },
        {
            audience: "201",
            audience_type: "Маъруза хонаси",
            financial: "Ilk va maktabgacha yoshdagi bolalar pedagogikasi",
            initialEducation: "Ona tili",
            initialEducation_2: "Amaliy o‘zbek (rus) tili. Davlat tilida ish yuritish (ECTS 6)",
            foreignLanguage: "Ingliz tili",
            psychology: "Psixologiya"
        },
        {
            audience: "201",
            audience_type: "Маъруза хонаси",
            financial: "Ilk va maktabgacha yoshdagi bolalar pedagogikasi",
            initialEducation: "Ona tili",
            initialEducation_2: "Amaliy o‘zbek (rus) tili. Davlat tilida ish yuritish (ECTS 6)",
            foreignLanguage: "Ingliz tili",
            psychology: "Psixologiya"
        },
        {
            audience: "201",
            audience_type: "Маъруза хонаси",
            financial: "Ilk va maktabgacha yoshdagi bolalar pedagogikasi",
            initialEducation: "Ona tili",
            initialEducation_2: "Amaliy o‘zbek (rus) tili. Davlat tilida ish yuritish (ECTS 6)",
            foreignLanguage: "Ingliz tili",
            psychology: "Psixologiya"
        },
        {
            audience: "201",
            audience_type: "Маъруза хонаси",
            financial: "Ilk va maktabgacha yoshdagi bolalar pedagogikasi",
            initialEducation: "Ona tili",
            initialEducation_2: "Amaliy o‘zbek (rus) tili. Davlat tilida ish yuritish (ECTS 6)",
            foreignLanguage: "Ingliz tili",
            psychology: "Psixologiya"
        },
        {
            audience: "201",
            audience_type: "Маъруза хонаси",
            financial: "Ilk va maktabgacha yoshdagi bolalar pedagogikasi",
            initialEducation: "Ona tili",
            initialEducation_2: "Amaliy o‘zbek (rus) tili. Davlat tilida ish yuritish (ECTS 6)",
            foreignLanguage: "Ingliz tili",
            psychology: "Psixologiya"
        },
        {
            audience: "201",
            audience_type: "Маъруза хонаси",
            financial: "Ilk va maktabgacha yoshdagi bolalar pedagogikasi",
            initialEducation: "Ona tili",
            initialEducation_2: "Amaliy o‘zbek (rus) tili. Davlat tilida ish yuritish (ECTS 6)",
            foreignLanguage: "Ingliz tili",
            psychology: "Psixologiya"
        },
        {
            audience: "201",
            audience_type: "Маъруза хонаси",
            financial: "Ilk va maktabgacha yoshdagi bolalar pedagogikasi",
            initialEducation: "Ona tili",
            initialEducation_2: "Amaliy o‘zbek (rus) tili. Davlat tilida ish yuritish (ECTS 6)",
            foreignLanguage: "Ingliz tili",
            psychology: "Psixologiya"
        },
        {
            audience: "201",
            audience_type: "Маъруза хонаси",
            financial: "Ilk va maktabgacha yoshdagi bolalar pedagogikasi",
            initialEducation: "Ona tili",
            initialEducation_2: "Amaliy o‘zbek (rus) tili. Davlat tilida ish yuritish (ECTS 6)",
            foreignLanguage: "Ingliz tili",
            psychology: "Psixologiya"
        },
        {
            audience: "201",
            audience_type: "Маъруза хонаси",
            financial: "Ilk va maktabgacha yoshdagi bolalar pedagogikasi",
            initialEducation: "Ona tili",
            initialEducation_2: "Amaliy o‘zbek (rus) tili. Davlat tilida ish yuritish (ECTS 6)",
            foreignLanguage: "Ingliz tili",
            psychology: "Psixologiya"
        },
        {
            audience: "201",
            audience_type: "Маъруза хонаси",
            financial: "Ilk va maktabgacha yoshdagi bolalar pedagogikasi",
            initialEducation: "Ona tili",
            initialEducation_2: "Amaliy o‘zbek (rus) tili. Davlat tilida ish yuritish (ECTS 6)",
            foreignLanguage: "Ingliz tili",
            psychology: "Psixologiya"
        },
        {
            audience: "201",
            audience_type: "Маъруза хонаси",
            financial: "Ilk va maktabgacha yoshdagi bolalar pedagogikasi",
            initialEducation: "Ona tili",
            initialEducation_2: "Amaliy o‘zbek (rus) tili. Davlat tilida ish yuritish (ECTS 6)",
            foreignLanguage: "Ingliz tili",
            psychology: "Psixologiya"
        },
        {
            audience: "201",
            audience_type: "Маъруза хонаси",
            financial: "Ilk va maktabgacha yoshdagi bolalar pedagogikasi",
            initialEducation: "Ona tili",
            initialEducation_2: "Amaliy o‘zbek (rus) tili. Davlat tilida ish yuritish (ECTS 6)",
            foreignLanguage: "Ingliz tili",
            psychology: "Psixologiya"
        },
        {
            audience: "201",
            audience_type: "Маъруза хонаси",
            financial: "Ilk va maktabgacha yoshdagi bolalar pedagogikasi",
            initialEducation: "Ona tili",
            initialEducation_2: "Amaliy o‘zbek (rus) tili. Davlat tilida ish yuritish (ECTS 6)",
            foreignLanguage: "Ingliz tili",
            psychology: "Psixologiya"
        },
        {
            audience: "201",
            audience_type: "Маъруза хонаси",
            financial: "Ilk va maktabgacha yoshdagi bolalar pedagogikasi",
            initialEducation: "Ona tili",
            initialEducation_2: "Amaliy o‘zbek (rus) tili. Davlat tilida ish yuritish (ECTS 6)",
            foreignLanguage: "Ingliz tili",
            psychology: "Psixologiya"
        },
    ]

    return (
        <>
            <div className="flex justify-between items-center">
                <PageHeaderSecondary
                    className="text-3xl text-indigo-950 font-medium">{t('timetable.title')}</PageHeaderSecondary>
            </div>

            <div className="my-6">
                <AudienceSchedule columns={columns} dataSource={dataSource}/>
            </div>
        </>
    )
}