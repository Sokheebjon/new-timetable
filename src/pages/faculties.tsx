import FacultyCard from "@/containers/faculties/faculty-card.tsx";
import {PageHeaderSecondary} from "@/components/ui/PageHeader.tsx";
import {useTranslation} from "react-i18next";
import {useCallback} from "react";
import {useNavigate} from "react-router-dom";

export default function Faculties() {
    const {t} = useTranslation();
    const navigate = useNavigate();

    const faculties = [
        {
            name: 'Pedagogika',
            link: '/timetable/teaching',
            id: 1
        },
        {
            name: 'Iqtisodiyot',
            link: '/timetable/finance',
            id: 2
        },
        {
            name: 'Informatika',
            link: '/timetable/information',
            id: 3
        },
        {
            name: 'Pedagogika',
            link: '/timetable/teaching',
            id: 1
        },
        {
            name: 'Iqtisodiyot',
            link: '/timetable/finance',
            id: 2
        },
        {
            name: 'Informatika',
            link: '/timetable/information',
            id: 3
        }
    ]

    const handleCardClick = useCallback((link: string) => () => navigate(link), [])


    return (
        <div>
            <PageHeaderSecondary
                className="text-3xl text-indigo-950 font-medium pb-4">{t('timetable.title')}</PageHeaderSecondary>
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5  gap-4">
                {
                    faculties.map(faculty => (
                        <div>
                            <FacultyCard onClick={handleCardClick(faculty.link)} key={faculty.id}
                                         facultyName={faculty.name}/>
                        </div>
                    ))
                }
            </div>
        </div>

    )
}