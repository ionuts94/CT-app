import { CommentWithUser } from "@/types/services/comments"
import { T_ViewContract } from "@/types/services/contracts"
import { AuditLog } from "@prisma/client"
import { MobileViewContractPageHeader } from "./mobile-view-contract-page-header"
import { MobileContractContentView } from "./mobile-contract-content-view"
import { SenderContractControls } from "../sender-contract-controls"
import { SignerContractControls } from "../signer-contract-controls"
import { MobileAsistantDrawer } from "./mobile-ai-asistant-drawer"
import { MobileCommentsDrawer } from "./mobile-comments-drawer"

type Props = {
  contractData: T_ViewContract,
  commentsData: CommentWithUser[],
  auditLogData: AuditLog[]
}

export const MobileViewContract: React.FC<Props> = ({
  contractData,
  commentsData,
  auditLogData,
}) => {
  const isSender = false;

  return (
    <>
      <div className="shrink-0">
        <MobileViewContractPageHeader
          contract={contractData}
          auditLog={auditLogData}
        >
          <div className="pt-4 border-t flex flex-col gap-2">
            <MobileAsistantDrawer contractData={contractData} />
            <MobileCommentsDrawer contractData={contractData} commentsData={commentsData} isSender={false} />
          </div>
        </MobileViewContractPageHeader>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto" >
        <MobileContractContentView
          contract={contractData}
        />
      </div >

      <div className="shrink-0 w-full ">
        <div className="px-4 pt-2 pb-4 flex justify-end gap-2">
          {isSender ? (
            <SenderContractControls contract={contractData} />
          ) : (
            <SignerContractControls contract={contractData} />
          )}
        </div>
      </div>
    </>
  )
}