import {Card, CardHeader} from "@/components/ui/card.tsx";

interface TFacultyCard {
    facultyName: string
    onClick?: () => void
}

export default function FacultyCard({
                                        facultyName,
                                        onClick = () => {
                                        }
                                    }: TFacultyCard) {
    return (
        <Card onClick={onClick} className="hover:border-l-8 hover:border-indigo-950 transition-all cursor-pointer">
            <CardHeader>
                {facultyName}
            </CardHeader>
        </Card>
    )
}