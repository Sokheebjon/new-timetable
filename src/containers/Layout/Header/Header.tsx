import {useMemo} from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import {Phone} from "lucide-react"
import logo from "@/assets/images/logo.svg"
import {DatePicker} from "@/components/ui/date-picker.tsx";
import {useTranslation} from "react-i18next";

export default function Header() {
    const {t} = useTranslation()

    const selectOptions = useMemo(() => [
        {
            label: t('select.timetable'),
            value: "timetable"
        },
        {
            label: t('select.audience_occupancy'),
            value: "audience_occupancy"
        }
    ], [t])


    return (
        <header className="bg-white shadow-sm">
            <div className="px-16">
                <div className="flex justify-between items-center py-2 text-sm">
                    <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4"/>
                        <span>+998 55 506 70 07</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Select defaultValue="uz">
                            <SelectTrigger className="w-[130px]">
                                <SelectValue placeholder="Language"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="uz">O'zbekcha</SelectItem>
                                <SelectItem value="ru">Русский</SelectItem>
                                <SelectItem value="en">English</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-200">
                <div className="px-16">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4">
                            <img src={logo} alt="RENESSANS TA'LIM UNIVERSITETI" width={60} height={60}/>
                            <div>
                                <h1 className="text-xl font-bold text-indigo-950">RENESSANS TA'LIM <br/> UNIVERSITETI</h1>
                            </div>
                        </div>
                        <nav>
                            <div className="flex space-x-6 text-sm font-medium">
                                <DatePicker defaultValue={new Date()}/>
                                <Select defaultValue={selectOptions[0].value}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {selectOptions.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}