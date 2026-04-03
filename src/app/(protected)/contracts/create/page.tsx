import { PageContainer } from "@/components/layout"
import { redirect } from "next/navigation"
import { ContractForm } from "./components/contract-form"
import TemplateService from "@/services/templates"
import SignatureService from "@/services/signatures"
import { withSafeService } from "@/lib/services-utils/with-safe-service"
import AuthService from "@/services/auth"
import { SignaturesFetchError } from "../components/signatures-fetch-error"
import UserService from "@/services/users"
import { PageContent } from "./components/page-content"

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

  if (signaturesError || !signatures?.allSignatures) {
    return (
      <SignaturesFetchError />
    )
  }

  return (
    <main>
      <PageContainer className="flex flex-col gap-4">
        <PageContent
          template={template}
          signatures={signatures.allSignatures}
          mainSignature={signatures.mainSignature}
        />
      </PageContainer>
    </main>
  )
}