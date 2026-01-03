import { PageContainer } from "@/components/layout"
import { redirect } from "next/navigation"
import { ContractForm } from "./components/create-contract-form"
import TemplateService from "@/services/templates"
import SignatureService from "@/services/signatures"
import { withSafeService } from "@/lib/services-utils/with-safe-service"

type Props = {
  searchParams: Promise<{ t: string }>
}

export default async function ContractPage({ searchParams }: Props) {
  const { t } = await searchParams

  if (!t) {
    redirect("/contracts")
  }

  const [
    { data: template, error: templateError },
    { data: signatures, error: signaturesError }
  ] = await Promise.all([
    withSafeService(() => TemplateService.getTemplateById({ templateId: t })),
    withSafeService(() => SignatureService.getAuthUserSignatures())
  ])

  return (
    <main>
      <PageContainer className="flex flex-col gap-4">
        <ContractForm template={template} signatures={signatures} />
      </PageContainer>
    </main>
  )
}