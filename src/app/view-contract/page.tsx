import { redirect } from "next/navigation"
import { ViewContractContentPage } from "./components/view-contract-page-content"
import AuthService from "@/services/auth"
import ContractService from "@/services/contracts"
import { withSafeService } from "@/lib/services-utils/with-safe-service"
import CommentService from "@/services/comments"
import AuditService from "@/services/audit"
import { ContractViewedTracker } from "./components/contract-viewed-tracker"
import { DEFAULT_REDIRECT_AUTH_ROUTE } from "@/constants/others"

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
    return redirect(DEFAULT_REDIRECT_AUTH_ROUTE)
  }

  const [
    { data: commentsData, error: commentsError },
    { data: auditLogData, error: auditLogError }
  ] = await Promise.all([
    withSafeService(() => CommentService.getContractComments({ contractId: contractData.id })),
    withSafeService(() => AuditService.getContractAuditLog({ contractId: contractData.id }))
  ])

  return (
    <>
      <ViewContractContentPage
        contractData={contractData}
        commentsData={commentsData || []}
        auditLogData={auditLogData || []}
      />
      <ContractViewedTracker
        actorType="SIGNER"
        contractId={contractData.id}
      />
    </>
  )
}