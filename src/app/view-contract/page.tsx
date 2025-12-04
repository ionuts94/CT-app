import { GetContractComments } from "@/actions/post/contracts/comments"
import { GetAuthUser } from "@/actions/post/auth"
import { redirect } from "next/navigation"
import { GetContractAuditLog, LogAudit } from "@/actions/post/audit"
import { GetContractForReceiver } from "@/actions/post/contracts/receivers"
import { ViewContractContentPage } from "./components/view-contract-page-content"
import { sleep } from "@/lib/utils"

type Props = {
  searchParams: Promise<{ t: string }>
}

export default async function ViewContractPage({ searchParams }: Props) {
  const { t } = await searchParams

  const [
    { data: contractData, error: contractError },
    { data: authUser }
  ] = await Promise.all([
    GetContractForReceiver({ receiverToken: t }),
    GetAuthUser()
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