import { GetTemplateById } from "@/actions/post/template"
import { PageContainer } from "@/components/layout"
import { RichTextEditor } from "@/components/rich-text-editor"
import { Card } from "@/components/ui/card"
import { redirect } from "next/navigation"
import { CreateContractForm } from "./components/create-contract-form"
import { GetSignatures } from "@/actions/post/signature"

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
    GetTemplateById({ templateId: t }),
    GetSignatures()
  ])

  return (
    <main>
      <PageContainer className="flex flex-col gap-4">
        <CreateContractForm template={template} signatures={signatures} />
      </PageContainer>
    </main>
  )
}