import {useCallback, useEffect, useMemo, useState} from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem, SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import {Phone} from "lucide-react"
import logo from "@/assets/images/logo.svg"
import {DatePicker} from "@/components/ui/date-picker.tsx";
import {useTranslation} from "react-i18next";
import {useLocation, useNavigate} from "react-router-dom";
import {DEFAULT_LANGUAGE} from "@/utils/constants.ts";

export default function Header() {
    const {t, i18n} = useTranslation();
    const defaultLanguage = localStorage.getItem("i18nextLng") ?? DEFAULT_LANGUAGE
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const [uiValue, setUiValue] = useState<string>();

    const selectOptions = useMemo(() => [
        {
            label: t('select.timetable'),
            value: "/timetable/faculties"
        },
        {
            label: t('select.audience_occupancy'),
            value: "/audience-occupancy"
        }
    ], [t])

    useEffect(() => {
        if (pathname.startsWith("/timetable")) {
            setUiValue(selectOptions[0].value)
        } else {
            setUiValue(pathname)
        }
    }, [pathname]);

    const handleChangeSelect = useCallback((value: string) => {
        localStorage.setItem("i18nextLng", value)
        i18n.changeLanguage(value)
    }, [i18n])

    const groupOptions = useMemo(() => [
        {
            label: "B-120",
            value: "B-120"
        },
        {
            label: "B-120",
            value: "B-120"
        },
        {
            label: "B-120",
            value: "B-120"
        },
        {
            label: "B-120",
            value: "B-120"
        },
        {
            label: "B-120",
            value: "B-120"
        },
        {
            label: "B-120",
            value: "B-120"
        },
        {
            label: "B-120",
            value: "B-120"
        },
    ], [t])

    const audienceOptions = useMemo(() => [
        {
            label: "A bino / Qurilish ko‘chasi 31",
            value: "block-a"
        },
        {
            label: "B bino / Lufiy ko‘chasi 47",
            value: "block-b"
        }
    ], [])

    const handleChangeUi = useCallback((value: string) => {
        navigate(value);
        setUiValue(value);
    }, [])

    const handleChangeGroups = useCallback((value: string) => {
        console.log(value)
    }, [])


    return (
        <header className="bg-white shadow-sm">
            <div className="px-16">
                <div className="flex justify-between items-center py-2 text-sm">
                    <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4"/>
                        <span>+998 55 506 70 07</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Select onValueChange={handleChangeSelect} defaultValue={defaultLanguage}>
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
                                <h1 className="text-xl font-bold text-indigo-950">RENESSANS TA'LIM <br/> UNIVERSITETI
                                </h1>
                            </div>
                        </div>
                        <div>
                            {pathname.startsWith("/audience-occupancy") && (
                                <Select
                                    onValueChange={handleChangeGroups}
                                >
                                    <SelectTrigger className="w-[420px]">
                                        <SelectValue placeholder={t("select.audience")}/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {audienceOptions.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                            {pathname.startsWith("/timetable") && (
                                <Select
                                    onValueChange={handleChangeGroups}
                                >
                                    <SelectTrigger className="w-[420px]">
                                        <SelectValue placeholder={t("select.group")}/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Matematika</SelectLabel>
                                            {groupOptions.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        </div>
                        <nav>
                            <div className="flex space-x-6 text-sm font-medium">
                                <DatePicker defaultValue={new Date()}/>
                                <Select
                                    value={uiValue}
                                    onValueChange={handleChangeUi}
                                    defaultValue={selectOptions[0].value}
                                >
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