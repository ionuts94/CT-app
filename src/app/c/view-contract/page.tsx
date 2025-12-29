import { CommentsSection } from "@/app/view-contract/components/comments-section"
import { ContractContentView } from "@/app/view-contract/components/contract-content-view"
import { ContractViewedTracker } from "@/app/view-contract/components/contract-viewed-tracker"
import { PageWidth } from "@/components/layout"
import { ViewContractPageHeader } from "@/components/view-contract-page-header"
import { withSafeService } from "@/lib/services-utils/with-safe-service"
import AuditService from "@/services/audit"
import AuthService from "@/services/auth"
import CommentService from "@/services/comments"
import ContractService from "@/services/contracts"

type Props = {
  searchParams: Promise<{ c: string }>
}

export default async function CompnayViewContract({ searchParams }: Props) {
  const { c } = await searchParams

  // TODO: Add authentication and permissions checks
  // Check if user is authenticated
  // Check if the contract belongs to the user

  const { data: authUser } = await withSafeService(() => AuthService.getAuthUser())

  const [
    { data: contractData, error: contractError },
    { data: commentsData, error: commentsError },
    { data: auditLogData, error: auditLogError }
  ] = await Promise.all([
    withSafeService(() => ContractService.getSenderContract({ contractId: c })),
    withSafeService(() => CommentService.getContractComments({ contractId: c })),
    withSafeService(() => AuditService.getContractAuditLog({ contractId: c })),
  ])

  if (!contractData) {
    return (<p>Nu am putut incarca contractul</p>)
  }

  // TODO: Error handling for contractError, commentsError, auditLogError

  return (
    <main className="bg-app">
      <ViewContractPageHeader
        contract={contractData} auditLog={auditLogData || []}
      />
      <PageWidth className="flex flex-1 gap-4 justify-between py-4 shadow-sm">
        <ContractContentView
          isSender={true}
          contract={contractData}
        />
      </PageWidth>
      <PageWidth>
        <CommentsSection
          user={contractData.owner}
          comments={commentsData || []}
          contract={contractData}
          isSender={true}
        />
      </PageWidth>
      <ContractViewedTracker
        actorType="SENDER"
        contractId={contractData.id}
      />
    </main>
  )
}