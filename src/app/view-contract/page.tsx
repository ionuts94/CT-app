import { GetContractComments } from "@/actions/post/contracts/comments"
import { GetAuthUser } from "@/actions/post/auth"
import { redirect } from "next/navigation"
import { GetContractAuditLog, LogAudit } from "@/actions/post/audit"
import { GetContractForReceiver } from "@/actions/post/contracts/receivers"
import { ViewContractContentPage } from "./components/view-contract-page-content"
import { sleep } from "@/lib/utils"
import AuthService from "@/services/auth"
import ContractService from "@/services/contracts"
import { withSafeService } from "@/lib/services-utils/with-safe-service"

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
    GetContractComments({ contractId: contractData.id }),
    GetContractAuditLog({ contractId: contractData.id })
  ])

  await sleep(800)

  return (
    <ViewContractContentPage
      contractData={contractData}
      commentsData={commentsData || []}
      auditLogData={auditLogData || []}
    />
  )
}