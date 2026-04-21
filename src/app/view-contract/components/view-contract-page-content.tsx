"use client"

import { AuditLog } from "@prisma/client"
import { T_ViewContract } from "@/types/services/contracts"
import { CommentWithUser } from "@/types/services/comments"
import { DesktopViewContract } from "./desktop-view/desktop-view-contract"
import { MobileViewContract } from "./mobile-view/mobile-view-contract"

type Props = {
  contractData: T_ViewContract,
  commentsData: CommentWithUser[],
  auditLogData: AuditLog[]
}

export const ViewContractContentPage: React.FC<Props> = ({ contractData, commentsData, auditLogData }) => {
  // return (
  //   <main className="flex min-h-screen flex-col bg-slate-100">
  //     <div className="min-h-full bg-pink-500"></div>

  //     {/* HEADER */}
  //     <div className="h-20 shrink-0 bg-red-400" />

  //     {/* CONTENT (IA TOT SPAȚIUL RĂMAS + SCROLL) */}
  //     <div className="flex-1 min-h-0 overflow-y-auto bg-green-400" />

  //     {/* FOOTER */}
  //     <div className="h-16 shrink-0 bg-blue-400" />

  //   </main>
  // )
  return (
    <main className="flex flex-col min-h-screen bg-slate-100">
      <div className="lg:hidden flex flex-col h-screen gap-2">
        <MobileViewContract
          contractData={contractData}
          auditLogData={auditLogData}
          commentsData={commentsData}
        />
      </div>

      <div className="hidden lg:block">
        <DesktopViewContract
          contractData={contractData}
          auditLogData={auditLogData}
          commentsData={commentsData}
        />
      </div>
    </main>
  )
}