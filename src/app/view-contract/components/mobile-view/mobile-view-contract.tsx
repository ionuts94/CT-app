import { CommentWithUser } from "@/types/services/comments"
import { T_ViewContract } from "@/types/services/contracts"
import { AuditLog } from "@prisma/client"
import { MobileViewContractPageHeader } from "./mobile-view-contract-page-header"
import { MobileContractContentView } from "./mobile-contract-content-view"
import { SenderContractControls } from "../sender-contract-controls"
import { SignerContractControls } from "../signer-contract-controls"

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
        />
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

// export const MobileViewContract: React.FC<Props> = ({ contractData, commentsData, auditLogData }) => {
//   return (
//     <div className="h-full flex flex-col bg-red-200">
//       <MobileViewContractPageHeader
//         contract={contractData}
//         auditLog={auditLogData}
//       />
//       <div className="flex-1 min-h-0 overflow-hidden">
//         <MobileContractContentView
//           contract={contractData}
//         />
//       </div>
//       <div className="h-[40px] w-full bg-blue-500">

//       </div>
//     </div>
//   )
// }