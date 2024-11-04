import {Select as ShadSelect, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {FC} from "react";
import {SelectProps} from "@radix-ui/react-select";
import {useTranslation} from "react-i18next";
import {cn} from "@/lib/utils.ts";

interface TOptions {
    value: string
    label: string
}

interface TSelectProps extends SelectProps {
    options: TOptions[],
    placeholder?: string,
    loading?: boolean,
    className?: string,
    contentClassName?: string
}

const Select: FC<TSelectProps> = ({options, placeholder, loading, className, contentClassName, ...props}) => {
    const {t} = useTranslation()

    return (
        <ShadSelect {...props}>
            <SelectTrigger className={cn(className, 'rounded-l')}>
                <SelectValue placeholder={placeholder}/>
            </SelectTrigger>
            <SelectContent className={contentClassName}>
                {
                    loading
                        ? <SelectItem value="loading" disabled>{t("loading")}</SelectItem>
                        : options.map((option, index) => (
                            <SelectItem className="cursor-pointer py-2.5" key={index} value={option.value}>{option.label}</SelectItem>))
                }
            </SelectContent>
        </ShadSelect>
    )
}

export default Select;