"use client"

import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

export type T_Filter = {
  label: string,
  value: string | null,
  defaultActiveFilterValue?: string | null | undefined,
  hideOnMobile?: boolean
}

type StatusFilterProps = {
  filters: T_Filter[],
  onFilterChange?: (filter: T_Filter) => any,
  defaultActiveFilterValue?: T_Filter
}

export const FilterBar: React.FC<StatusFilterProps> = ({ filters, onFilterChange = () => null, defaultActiveFilterValue }) => {
  const [activeFilter, setActiveFilter] = useState<T_Filter | null>(defaultActiveFilterValue || null)

  if (!filters) return null;

  const handleSelectFilter = (filter: T_Filter) => {
    setActiveFilter(filter)
    onFilterChange(filter)
  }

  const handleFilterChange = (filterValue: string) => {
    const filter = filters.find(item => item.value === filterValue)
    handleSelectFilter(filter || filters[0])
  }

  return (
    <>
      <div className="lg:hidden w-full">
        <Select
          onValueChange={handleFilterChange}
          defaultValue={defaultActiveFilterValue?.value || filters[0].value!}
        >
          <SelectTrigger className="w-full border border-sidebar-primary">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {filters.map((item, index) => (
              <SelectItem
                key={index}
                value={item.value!}
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="hidden lg:flex bg-card-secondary rounded-lg gap-2 h-full p-1 border border-sidebar-primary shadow-sm">
        {filters.map(item => (
          <Button
            key={item.value}
            variant="none"
            onClick={() => handleSelectFilter(item)}
            className={cn(
              "text-color-secondary rounded-lg hover:bg-sidebar-primary border-[2px] border-transparent",
              activeFilter?.value === item.value && "bg-background !border-primary shadow-sm shadow-primary hover:bg-background",
            )}
          >
            {item.label}
          </Button>
        ))}
      </div>
    </>
  )
}