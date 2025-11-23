"use client"

import { FilterBar, T_Filter } from "@/components/filter-bar"
import { useQueryParam } from "@/hooks/use-query-param"

type Props = {
  status: string
}

const QUERY_KEY = "status"

export const ContractsFilterBar: React.FC<Props> = ({ status }) => {
  const { addQueryParam, deleteQueryParam } = useQueryParam()

  const handleFilterChange = (filter: T_Filter) => {
    if (!filter.value) return deleteQueryParam(QUERY_KEY)
    addQueryParam(QUERY_KEY, filter.value)
  }

  return (
    <FilterBar
      filters={FILTERS}
      onFilterChange={handleFilterChange}
      defaultActiveFilterValue={FILTERS.find(f => f.value === status) || FILTERS[0]}
    />
  )
}

const FILTERS = [
  {
    label: "All",
    value: null
  },
  {
    label: "Draft",
    value: "DRAFT"
  },
  {
    label: "Pending",
    value: "OUT_FOR_SIGNATURE"
  },
  {
    label: "Signed",
    value: "FULLY_SIGNED"
  },
  {
    label: "Declined",
    value: "DECLINED"
  },
  {
    label: "Revoked",
    value: "REVOKED"
  },
  {
    label: "Expired",
    value: "EXPIRED"
  },
]