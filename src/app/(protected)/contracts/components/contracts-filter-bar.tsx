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
    value: null,
    hideOnMobile: false,
  },
  {
    label: "Draft",
    value: "DRAFT",
    hideOnMobile: false,
  },
  {
    label: "Pending",
    value: "OUT_FOR_SIGNATURE",
    hideOnMobile: false,
  },
  {
    label: "Signed",
    value: "FULLY_SIGNED",
    hideOnMobile: false,
  },
  {
    label: "Declined",
    value: "DECLINED",
    hideOnMobile: true,
  },
  {
    label: "Revoked",
    value: "REVOKED",
    hideOnMobile: true,
  },
  {
    label: "Expired",
    value: "EXPIRED",
    hideOnMobile: true,
  },
]