"use client"

import { FilterBar, T_Filter } from "@/components/filter-bar"
import { useQueryParam } from "@/hooks/use-query-param"

type Props = {

}

const QUERY_KEY = "category"

export const TemplatesFilterBar: React.FC<Props> = ({ }) => {
  const { addQueryParam, deleteQueryParam } = useQueryParam()

  const handleFilterChange = (filter: T_Filter) => {
    if (!filter.value) return deleteQueryParam(QUERY_KEY)
    addQueryParam(QUERY_KEY, filter.value)
  }

  return (
    <FilterBar
      filters={FILTERS}
      onFilterChange={handleFilterChange}
      defaultActiveFilterValue={FILTERS[0]}
    />
  )
}

const FILTERS = [
  {
    label: "All",
    value: null
  },
  {
    label: "Pending",
    value: "pending"
  },
  {
    label: "Signed",
    value: "signed"
  },
  {
    label: "Expired",
    value: "expired"
  },
  {
    label: "Draft",
    value: "draft"
  }
]