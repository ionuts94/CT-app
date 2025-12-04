"use client"

import { PageWidth } from "@/components/layout"
import { PageHeader } from "./page-header"
import { ContractContentView } from "./contract-content-view"
import { ReceiverContractAssistant } from "./assistant/receiver-contract-assistant"
import { CommentsSection } from "./comments-section"
import { T_ViewContract } from "@/actions/post/contracts"
import { AuditLog, Comment } from "@prisma/client"
import { useEffect } from "react"
import { LogAudit } from "@/actions/post/audit"

type Props = {
  contractData: T_ViewContract,
  commentsData: Comment[],
  auditLogData: AuditLog[]
}

export const ViewContractContentPage: React.FC<Props> = ({ contractData, commentsData, auditLogData }) => {
  useEffect(() => {
    LogAudit({
      contractId: contractData?.id!,
      action: "CONTRACT_VIEWED",
      actorType: "SIGNER",
      ip: "192.168.1.1",
      userAgent: "Chrome",
      metadata: {},
      contractVersion: 1,
      userEmail: contractData.receiverEmail
    })
  }, [])

  return (
    <main className="bg-app flex flex-col min-h-screen">
      <PageHeader contract={contractData} auditLog={auditLogData} />
      <PageWidth className="px-[70px] flex flex-1 gap-4 justify-between py-4 shadow-sm">
        <div className="w-full lg:w-3/5">
          <ContractContentView contract={contractData} />
        </div>
        <div className="lg:w-2/5 flex-1">
          <ReceiverContractAssistant contractContent={contractData.currentVersion.content as string} />
        </div>
      </PageWidth>
      <PageWidth className="px-[70px] py-4 w-full">
        <CommentsSection
          comments={commentsData}
          contract={contractData}
          isSender={false}
        />
      </PageWidth>
    </main>
  )
}