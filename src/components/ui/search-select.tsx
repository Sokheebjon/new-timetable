"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {useTranslation} from "react-i18next";

/* eslint-disable  @typescript-eslint/no-explicit-any */
interface TComboboxProps {
    options: { label: string; value: string }[]
    placeholder?: string
    handleSelect: (label: string, value: string) => void
    value?: string | number
    width?: number | string
    renderLabelTitle?: (option: { [key: string]: any }) => React.ReactNode | string
}

export function SearchSelect({options, placeholder, handleSelect, value, renderLabelTitle, width = 400}: TComboboxProps) {
    const {t} = useTranslation()
    const [open, setOpen] = React.useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={`w-[${width}px] justify-between`}
                >
                    {value
                        ? options.find((framework) => framework.value === value)?.label
                        : placeholder}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className={`w-[${width}px] p-0`}>
                <Command>
                    <CommandInput placeholder={placeholder} />
                    <CommandList>
                        <CommandEmpty>{t("select.no_data")}</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => (
                                <>
                                    {renderLabelTitle && <CommandItem className="font-semibold">{renderLabelTitle(option)}</CommandItem>}
                                    <CommandItem
                                        key={option.value}
                                        value={option.value}
                                        onSelect={(label)=> handleSelect(label, option.value)}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === option.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {option.label}
                                    </CommandItem>
                                </>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
