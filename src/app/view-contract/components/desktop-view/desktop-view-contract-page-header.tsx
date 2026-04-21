import { PageWidth } from "@/components/layout"
import { T_ViewContract } from "@/types/services/contracts"
import { AuditLog } from "@prisma/client"
import { Text } from "@/components/topography"
import { AuditLogDialog } from "@/components/audit-log-dialog"
import { DownloadContractButton } from "@/components/download-contract-button"
import { StatusBadge } from "@/components/status-badge"

type Props = {
  contract: T_ViewContract,
  auditLog: AuditLog[] | []
  children?: React.ReactNode
}

export const DesktopViewContractPageHeader: React.FC<Props> = ({ contract, auditLog, children }) => {
  return (
    <PageWidth className="lg:px-17.5 flex flex-col gap-2 lg:flex-row items-center justify-between bg-white py-6 border-b-[1px] shadow-sm">
      <div className="flex gap-2 items-center">
        {contract?.company?.logoUrl &&
          <img src={contract.company.logoUrl} alt="company logo" className="h-[40px] w-fit" />
        }
        <Text size="xl" className="text-black/80">{contract.company.name}</Text>
      </div>
      <Text size="2xl" weight="bold">
        {contract.title}
      </Text>

      <div className="flex gap-2">
        <AuditLogDialog auditLog={auditLog} />
        <DownloadContractButton contract={contract} />
        <StatusBadge status={contract.status} />
        {children}
      </div>
    </PageWidth>
  )
}