"use client"

import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

interface TDatePickerProps {
    defaultValue?: Date
    className?: string
}

export function DatePicker({defaultValue, className}:TDatePickerProps ) {
    const [date, setDate] = React.useState<Date | undefined>(defaultValue)

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                        className
                    )}
                >
                    <CalendarIcon />
                    <div className="ml-2">
                        {date ? format(date, "dd.MM.yyyy") : <span>Sanani tanlang</span>}
                    </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}
