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
    console.log("error" + contractError?.message)
    return <p>Errorr</p>
  }


  console.log(contract)
  return (
    <main>
      <PageContainer className="flex flex-col gap-4">
        <ContractForm
          isEditing
          signatures={signatures}
          data={{
            contractId: c,
            title: contract.title,
            content: contract.currentVersionContent.content,
            contractStatus: contract.status,
            expiresAt: contract.expiresAt || undefined,
            ownerSignatureId: contract.ownerSignatureId,
            receiverEmail: contract.receiverEmail,
            receiverName: contract.receiverName,
            signingDeadline: contract.signingDeadline || undefined,
            optionalMessage: contract.optionalMessage,
          }}
        />
      </PageContainer>
    </main>
  )
}