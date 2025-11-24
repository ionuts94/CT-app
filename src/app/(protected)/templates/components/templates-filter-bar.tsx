"use client"

import { FilterBar, T_Filter } from "@/components/filter-bar"
import { useQueryParam } from "@/hooks/use-query-param"
import { useMemo } from "react"

type Props = {
  categories: { category: string }[]
}

const QUERY_KEY = "category"

export const TemplatesFilterBar: React.FC<Props> = ({ categories }) => {
  const { addQueryParam, deleteQueryParam } = useQueryParam()

  const handleFilterChange = (filter: T_Filter) => {
    if (!filter.value) return deleteQueryParam(QUERY_KEY)
    addQueryParam(QUERY_KEY, filter.value)
  }

  const filters = useMemo(() => {
    const f = [...BASE_FILTERS]
    categories.forEach(category => f.push({ label: category.category, value: category.category }))
    return f
  }, [categories])

  return (
    <FilterBar
      filters={filters}
      onFilterChange={handleFilterChange}
      defaultActiveFilterValue={filters[0]}
    />
  )
}

const BASE_FILTERS: { label: string, value: string | null }[] = [
  {
    label: "All",
    value: null
  }
]