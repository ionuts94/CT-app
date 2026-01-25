import { PageContainer } from "@/components/layout"
import { redirect } from "next/navigation"
import { ContractForm } from "./components/contract-form"
import TemplateService from "@/services/templates"
import SignatureService from "@/services/signatures"
import { withSafeService } from "@/lib/services-utils/with-safe-service"
import AuthService from "@/services/auth"
import { SignaturesFetchError } from "../components/signatures-fetch-error"

type Props = {
  searchParams: Promise<{ t: string }>
}

export default async function ContractPage({ searchParams }: Props) {
  const { t } = await searchParams

  if (!t) {
    redirect("/contracts")
  }

  const { data: authUser, error: authUserError } = await withSafeService(() => AuthService.getAuthUser())

  if (!authUser) {
    redirect("/sign-in")
  }

  const [
    { data: template, error: templateError },
    { data: signatures, error: signaturesError }
  ] = await Promise.all([
    withSafeService(() => TemplateService.getTemplateById({ templateId: t })),
    withSafeService(() => SignatureService.getUserSignatures({ userId: authUser.id }))
  ])

  if (signaturesError || !signatures) {
    return (
      <SignaturesFetchError />
    )
  }

  return (
    <main>
      <PageContainer className="flex flex-col gap-4">
        <ContractForm
          signatures={signatures.signatures}
          mainSignature={signatures?.mainSignature}
          data={{
            content: template?.content as string,
            templateTitle: template?.title,
          }}
        />
      </PageContainer>
    </main>
  )
}