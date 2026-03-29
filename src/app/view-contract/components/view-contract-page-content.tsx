"use client"

import { PageWidth } from "@/components/layout"
import { PageHeader } from "./page-header"
import { ContractContentView } from "./contract-content-view"
import { ReceiverContractAssistant } from "./assistant/receiver-contract-assistant"
import { CommentsSection } from "./comments-section"
import { AuditLog } from "@prisma/client"
import { T_ViewContract } from "@/types/services/contracts"
import { CommentWithUser } from "@/types/services/comments"
import { Card } from "@/components/ui/card"
import { Tabs } from "./tabs"

type Props = {
  contractData: T_ViewContract,
  commentsData: CommentWithUser[],
  auditLogData: AuditLog[]
}

export const ViewContractContentPage: React.FC<Props> = ({ contractData, commentsData, auditLogData }) => {
  return (
    <main className="flex flex-col min-h-screen bg-slate-100">
      <PageHeader contract={contractData} auditLog={auditLogData} />
      <PageWidth className="flex flex-1 gap-4 justify-between py-4 shadow-sm">
        <div className="w-full lg:w-65/100">
          <ContractContentView contract={contractData} />
        </div>

        <div className="lg:w-35/100 self-start h-[calc(100vh-140px)] min-h-0">
          <Tabs
            contractData={contractData}
            commentsData={commentsData}
          />
        </div>
      </PageWidth>
    </main>
  )
}