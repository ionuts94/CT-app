import { redirect } from "next/navigation"
import { ViewContractContentPage } from "./components/view-contract-page-content"
import AuthService from "@/services/auth"
import ContractService from "@/services/contracts"
import { withSafeService } from "@/lib/services-utils/with-safe-service"
import CommentService from "@/services/comments"
import AuditService from "@/services/audit"

type Props = {
  searchParams: Promise<{ t: string }>
}

export default async function ViewContractPage({ searchParams }: Props) {
  const { t } = await searchParams

  const [
    { data: authUser },
    { data: contractData, error: contractError }
  ] = await Promise.all([
    withSafeService(() => AuthService.getAuthUser()),
    withSafeService(() => ContractService.getReceiverContract({ receiverToken: t }))
  ])

  if (!contractData) {
    return (
      <p>Nu am putut incarca contractul</p>
    )
  }

  if (authUser && authUser.email !== contractData.receiverEmail) {
    return redirect("/dashboard")
  }

  const [
    { data: commentsData, error: commentsError },
    { data: auditLogData, error: auditLogError }
  ] = await Promise.all([
    withSafeService(() => CommentService.getContractComments({ contractId: contractData.id })),
    withSafeService(() => AuditService.getContractAuditLog({ contractId: contractData.id }))
  ])

  return (
    <ViewContractContentPage
      contractData={contractData}
      commentsData={commentsData || []}
      auditLogData={auditLogData || []}
    />
  )
}