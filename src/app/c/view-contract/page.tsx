import { GetAuthUser } from "@/actions/post/auth"
import { FreeGetViewContract, GetContractWithCompanyAndOwner } from "@/actions/post/contracts"
import { GetContractComments } from "@/actions/post/contracts/comments"
import { CommentsSection } from "@/app/view-contract/components/comments-section"
import { ContractContentView } from "@/app/view-contract/components/contract-content-view"
import { PageWidth } from "@/components/layout"
import { ViewContractPageHeader } from "@/components/view-contract-page-header"

type Props = {
  searchParams: Promise<{ c: string }>
}

export default async function CompnayViewContract({ searchParams }: Props) {
  const { c } = await searchParams

  // TODO: Add authentication and permissions checks
  // Check if user is authenticated
  // Check if the contract belongs to the user

  const [
    { data: contractData, error: contractError },
    { data: commentsData, error: commentsError },
    { data: authUser }
  ] = await Promise.all([
    FreeGetViewContract({ contractId: c }),
    GetContractComments({ contractId: c }),
    GetAuthUser()
  ])

  if (!contractData) {
    return (<p>Nu am putut incarca contractul</p>)
  }

  return (
    <main>
      <ViewContractPageHeader contract={contractData} />
      <PageWidth className="flex flex-1 gap-4 justify-between py-4 shadow-sm">
        <ContractContentView contract={contractData} />
      </PageWidth>
      <PageWidth>
        <CommentsSection
          comments={commentsData}
          contract={contractData}
          isSender={true}
        />
      </PageWidth>

    </main>
  )
}