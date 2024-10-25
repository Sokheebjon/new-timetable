import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";

interface TTablist {
    value: string
    label: string
}

interface TEducationFormTabsProps {
    tabList: TTablist[]
    defaultValue?: string
}

export default function EducationFormTabs({tabList, defaultValue}: TEducationFormTabsProps) {
    return (
        <Tabs defaultValue={defaultValue} className="w-[400px]">
            <TabsList>
                {tabList.map(tab => (
                    <TabsTrigger key={tab.value} value={tab.value}>
                        {tab.label}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    )
}