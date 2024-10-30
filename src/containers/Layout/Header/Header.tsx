import {useCallback, useEffect, useMemo, useState} from "react";
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
import {Link, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {DEFAULT_LANGUAGE} from "@/utils/constants.ts";
import {format} from "date-fns";
import {useBuildingsQuery} from "@/hooks/query/useBuildingsQuery.ts";
import {get} from "lodash";

export default function Header() {
    const {t, i18n} = useTranslation();
    const defaultLanguage = localStorage.getItem("i18nextLng") ?? DEFAULT_LANGUAGE
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const [uiValue, setUiValue] = useState<string>();
    const [searchParams, setSearchParams] = useSearchParams();
    const currentSearchParams = Object.fromEntries([...searchParams]);
    const defaultDate = searchParams.get("date") ? new Date(searchParams.get("date") as string) : new Date();
    const defaultBuilding = searchParams.get("building") ?? ""

    const buildingsQuery = useBuildingsQuery({limit: 200}, {staleTime: 600000})
    const buildingsList = get(buildingsQuery, "data.data.data", [])
    const buildingsOptions = useMemo(() => buildingsList.map((building: { name: string, id: string }) => ({
        label: building.name,
        value: String(building.id)
    })), [buildingsList])

    console.log(defaultBuilding, "defaultBuilding")


    const selectOptions = useMemo(() => [
        {
            label: t('select.timetable'),
            value: "/timetable"
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

    const handleDateChange = useCallback((value?: Date) => {
        if (value) {
            const date = format((value), "yyyy-MM-dd")
            setSearchParams({...currentSearchParams, date})
        }
    }, [])

    // const groupsQuery = useGroupsQuery({ limit: 200 })
    // const groupsList = get(groupsQuery, "data.data.data.data.items", [])

    const handleChangeUi = useCallback((value: string) => {
        navigate(value);
        setUiValue(value);
    }, [])

    const handleChangeGroups = useCallback((value: string) => {
        setSearchParams({...currentSearchParams, building: value})
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
                        <Link to="/">
                            <div className="flex items-center space-x-4">
                                <img src={logo} alt="RENESSANS TA'LIM UNIVERSITETI" width={60} height={60}/>
                                <div>
                                    <h1 className="text-xl font-bold text-indigo-950">RENESSANS
                                        TA'LIM <br/> UNIVERSITETI</h1>
                                </div>
                            </div>
                        </Link>
                        <div>
                            {pathname.startsWith("/audience-occupancy") && (
                                <Select
                                    onValueChange={handleChangeGroups}
                                    defaultValue={defaultBuilding}
                                >
                                    <SelectTrigger className="w-[420px]">
                                        <SelectValue placeholder={t("select.audience")}/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {buildingsOptions.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                            {/*{pathname.startsWith("/timetable") && (*/}
                            {/*    <Select*/}
                            {/*        onValueChange={handleChangeGroups}*/}
                            {/*    >*/}
                            {/*        <SelectTrigger className="w-[420px]">*/}
                            {/*            <SelectValue placeholder={t("select.group")}/>*/}
                            {/*        </SelectTrigger>*/}
                            {/*        <SelectContent>*/}
                            {/*            <SelectGroup>*/}
                            {/*                <SelectLabel>Matematika</SelectLabel>*/}
                            {/*                {groupOptions.map((option) => (*/}
                            {/*                    <SelectItem key={option.value} value={option.value}>*/}
                            {/*                        {option.label}*/}
                            {/*                    </SelectItem>*/}
                            {/*                ))}*/}
                            {/*            </SelectGroup>*/}
                            {/*        </SelectContent>*/}
                            {/*    </Select>*/}
                            {/*)}*/}
                        </div>
                        <nav>
                            <div className="flex space-x-6 text-sm font-medium">
                                <DatePicker onChange={handleDateChange} defaultValue={defaultDate}/>
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