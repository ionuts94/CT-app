import { CommentsSection } from "@/app/view-contract/components/comments-section"
import { ContractContentView } from "@/app/view-contract/components/contract-content-view"
import { ContractViewedTracker } from "@/app/view-contract/components/contract-viewed-tracker"
import { PageWidth } from "@/components/layout"
import { Card } from "@/components/ui/card"
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
    return (<p className="text-red-400">Could not load the contract</p>)
  }

  // TODO: Error handling for contractError, commentsError, auditLogError

  return (
    <main className="flex bg-slate-200 flex-col min-h-screen">
      <ViewContractPageHeader
        contract={contractData} auditLog={auditLogData || []}
      />
      <PageWidth className="flex flex-1 h-full gap-4 justify-between py-4 shadow-sm">
        <div className="w-full lg:w-65/100">
          <ContractContentView
            isSender={true}
            contract={contractData}
          />
        </div>

        <div className="lg:w-35/100 self-start h-[85vh] rounded-lg min-h-0 overflow-y-auto">
          <Card className="flex-1 min-h-0 rounded-md px-4 py-0 overflow-y-auto">
            <div className="h-full min-h-0">
              <CommentsSection
                user={contractData.owner}
                comments={commentsData || []}
                contract={contractData}
                isSender={true}
              />
            </div>
          </Card>
        </div>
      </PageWidth>
      <ContractViewedTracker
        actorType="SENDER"
        contractId={contractData.id}
      />
    </main>
  )
}