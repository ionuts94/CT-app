"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type Props = {
  onSelectDate: (newDate: Date) => any
  defaultValue?: Date
  placeholder?: string
}

export function DatePicker({
  onSelectDate,
  defaultValue,
  placeholder,
}: Props) {
  const [date, setDate] = React.useState<Date | undefined>(defaultValue)
  const [open, setOpen] = React.useState(false)

  const onNewDate = (newDate?: Date) => {
    if (!newDate) return

    setDate(newDate)
    onSelectDate(newDate)

    // 🔥 AICI e magia
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="none"
          data-empty={!date}
          className="border border-primary data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "PPP")
          ) : (
            <span>{placeholder || "Selectează data"}</span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onNewDate}
          captionLayout="dropdown"
          className="rounded-lg border shadow-sm"
          startMonth={new Date()}
          endMonth={new Date(2090, 0)}
          disabled={{ before: new Date() }}
          classNames={{
            today:
              "border border-primary/40 text-primary font-medium rounded-md",
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
