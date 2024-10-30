import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";

/* eslint-disable  @typescript-eslint/no-explicit-any */
interface TTablist {
    value: any,
    label: string,
    selected?: boolean
}

interface TEducationFormTabsProps {
    tabList: TTablist[]
    defaultValue?: string
    onChange?: (value: string) => void
}

export default function EducationFormTabs({tabList, defaultValue, onChange}: TEducationFormTabsProps) {
    return (
        <Tabs onValueChange={onChange} defaultValue={defaultValue}>
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