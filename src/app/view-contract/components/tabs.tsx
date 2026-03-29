"use client"

import { FilterBar, T_Filter } from "@/components/filter-bar"
import { Card } from "@/components/ui/card"
import { useQueryParam } from "@/hooks/use-query-param"
import { CommentWithUser } from "@/types/services/comments"
import { T_ViewContract } from "@/types/services/contracts"
import { AuditLog } from "@prisma/client"
import { useState } from "react"
import { CommentsSection } from "./comments-section"
import { ReceiverContractAssistant } from "./assistant/receiver-contract-assistant"
import { cn } from "@/lib/utils"

type Props = {
  contractData: T_ViewContract,
  commentsData: CommentWithUser[],
}

export const Tabs: React.FC<Props> = ({ contractData, commentsData }) => {
  const [currentViewItem, setCurrentViewItem] = useState<string | null>("AI_ASSISTANT")

  const handleFilterChange = (filter: T_Filter) => {
    setCurrentViewItem(filter.value)
  }

  return (
    <div className="w-full h-full min-h-0 flex flex-col gap-2">
      <div className="shrink-0">
        <FilterBar
          filters={FILTERS}
          onFilterChange={handleFilterChange}
          defaultActiveFilterValue={FILTERS.find(f => f.value === currentViewItem) || FILTERS[0]}
        />
      </div>

      <Card className="flex-1 min-h-0 rounded-md px-4 py-2 overflow-y-auto">
        <div className="h-full min-h-0">
          <div className={cn("w-full h-full", currentViewItem !== "AI_ASSISTANT" && "hidden")}>
            <ReceiverContractAssistant
              contractContent={contractData.currentVersion.content as string}
            />
          </div>

          <div className={cn("w-full h-full", currentViewItem !== "DISCUSSIONS" && "hidden")}>
            <CommentsSection
              comments={commentsData}
              contract={contractData}
              isSender={false}
            />
          </div>
        </div>
      </Card>
    </div>
  )
}

const FILTERS = [
  {
    label: "AI Assistant",
    value: "AI_ASSISTANT",
    hideOnMobile: false,
  },
  {
    label: "Discussions",
    value: "DISCUSSIONS",
    hideOnMobile: false,
  },
]