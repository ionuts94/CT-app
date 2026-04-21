import { PageWidth } from "@/components/layout"
import { T_ViewContract } from "@/types/services/contracts"
import { AuditLog } from "@prisma/client"
import { Text } from "@/components/topography"
import { AuditLogDialog } from "@/components/audit-log-dialog"
import { DownloadContractButton } from "@/components/download-contract-button"
import { StatusBadge } from "@/components/status-badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

type Props = {
  contract: T_ViewContract,
  auditLog: AuditLog[] | []
  children?: React.ReactNode
}

export const MobileViewContractPageHeader: React.FC<Props> = ({ contract, auditLog, children }) => {
  return (
    <PageWidth className="flex gap-2 justify-between bg-white py-2 border-b-2 shadow-sm">
      <div className="">
        <div className="flex gap-2 items-center">
          {contract?.company?.logoUrl &&
            <img src={contract.company.logoUrl} alt="company logo" className="h-10 w-fit" />
          }
          <Text size="xl" className="text-black/80">{contract.company.name}</Text>
        </div>
        <Text size="2xl" weight="bold">
          {contract.title}
        </Text>
      </div>

      <Sheet>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent>
          <div className="flex flex-col gap-4 px-4 py-12">
            <AuditLogDialog auditLog={auditLog} />
            <DownloadContractButton contract={contract} />
            {children}
          </div>
        </SheetContent>
      </Sheet>
    </PageWidth>
  )
}