import { T_ViewContract } from "@/actions/post/contracts"
import { ViewContractPageHeader } from "@/components/view-contract-page-header"
import { AuditLog } from "@prisma/client"

type Props = {
  contract: T_ViewContract,
  auditLog: AuditLog[] | []
}

export const PageHeader: React.FC<Props> = ({ contract, auditLog }) => {
  return (
    <ViewContractPageHeader contract={contract} auditLog={auditLog}>

    </ViewContractPageHeader>
  )
}