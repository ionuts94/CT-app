"use client"

import { cn } from "@/lib/utils"
import { Button } from "./ui/button"
import { useState } from "react"

export type T_Filter = {
  label: string,
  value: string | null,
  defaultActiveFilterValue?: string | null | undefined
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

  return (
    <div className="bg-card-secondary rounded-lg flex gap-2 h-full p-1 border border-sidebar-primary shadow-sm">
      {filters.map(item => (
        <Button
          key={item.value}
          variant="none"
          onClick={() => handleSelectFilter(item)}
          className={cn(
            "text-color-secondary rounded-lg hover:bg-sidebar-primary border-[2px] border-transparent",
            activeFilter?.value === item.value && "bg-background !border-primary shadow-sm shadow-primary hover:bg-background"
          )}
        >
          {item.label}
        </Button>
      ))}
    </div>
  )
}