import { CommentWithUser } from "@/types/services/comments"
import { T_ViewContract } from "@/types/services/contracts"
import { AuditLog } from "@prisma/client"
import { PageHeader } from "../page-header"
import { PageWidth } from "@/components/layout"
import { DesktopViewContractPageHeader } from "./desktop-view-contract-page-header"
import { DesktopContractContentView } from "./desktop-contract-content-view"
import { Tabs } from "../tabs"

type Props = {
  contractData: T_ViewContract,
  commentsData: CommentWithUser[],
  auditLogData: AuditLog[]
}

export const DesktopViewContract: React.FC<Props> = ({ contractData, commentsData, auditLogData }) => {
  return (
    <>
      <DesktopViewContractPageHeader contract={contractData} auditLog={auditLogData} />

      <PageWidth className="flex flex-1 gap-4 justify-between py-4 shadow-sm">
        <div className="w-full lg:w-65/100">
          <DesktopContractContentView contract={contractData} />
        </div>

        <div className="lg:w-35/100 self-start h-[85vh] min-h-0">
          <Tabs
            contractData={contractData}
            commentsData={commentsData}
          />
        </div>
      </PageWidth>
    </>
  )
}