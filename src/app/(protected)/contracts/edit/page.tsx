import { PageContainer } from "@/components/layout"
import { withSafeService } from "@/lib/services-utils/with-safe-service"
import ContractService from "@/services/contracts"
import { ContractForm } from "../create/components/create-contract-form"
import SignatureService from "@/services/signatures"


type Props = {
  searchParams: Promise<{ c: string }>
}

export default async function EditContractPage({ searchParams }: Props) {
  const { c } = await searchParams
  const [
    { data: contract, error: contractError },
    { data: signatures, error: signaturesError }
  ] = await Promise.all([
    withSafeService(() => ContractService.getContractWithCompanyAndOwner({ contractId: c })),
    withSafeService(() => SignatureService.getAuthUserSignatures())
  ])

  if (contractError || !contract) {
    return <p>Errorr</p>
  }

  return (
    <main>
      <PageContainer className="flex flex-col gap-4">
        <ContractForm
          isEditing
          contract={contract}
          signatures={signatures}
          data={{
            contractId: c,
            title: contract.title,
            content: contract.currentVersionContent.content,
            contractStatus: contract.status,
            expiresAt: contract.expiresAt,
            ownerSignatureId: contract.ownerSignatureId,
            receiverEmail: contract.receiverEmail,
            receiverName: contract.receiverName
          }}
        />
      </PageContainer>
    </main>
  )
}