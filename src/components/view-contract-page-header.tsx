import { T_ViewContract } from "@/actions/post/contracts"
import { PageWidth } from "@/components/layout"
import { Text } from "@/components/topography"
import { Clock } from "lucide-react"
import { StatusBadge } from "./status-badge"
import { DownloadContractButton } from "./download-contract-button"
import { AuditLogDialog } from "./audit-log-dialog"
import { AuditLog } from "@prisma/client"

type Props = {
  contract: T_ViewContract,
  auditLog: AuditLog[] | [],
  children?: React.ReactNode
}

export const ViewContractPageHeader: React.FC<Props> = ({ contract, children, auditLog }) => {
  return (
    <div>
      <PageWidth className="px-[70px] flex items-center justify-between bg-white py-6 border-b-[1px] shadow-sm">
        <div className="flex gap-2 items-center">
          {contract?.company?.logoUrl &&
            <img src={contract.company.logoUrl} alt="company logo" className="h-[40px] w-fit" />
          }
          <Text size="xl" className="text-black/80">{contract.company.name}</Text>
        </div>
        <Text size="2xl" weight="bold">
          {contract.title}
        </Text>
        <div className="flex items-center gap-2">
          <AuditLogDialog auditLog={auditLog} />
          <StatusBadge status={contract.status} />
          <DownloadContractButton contract={contract} />
          {children}
        </div>
      </PageWidth>
    </div>
  )
}