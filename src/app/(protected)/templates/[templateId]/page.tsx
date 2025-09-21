import { PageContainer } from "@/components/layout";
import { TemplateHeader } from "./components/template-header";
import { TemplateForm } from "./components/template-form";
import { TemplateProvider } from "@/contexts/template-assistant-context";
import { Template } from "@prisma/client";
import { GetTemplateById } from "@/actions/post/template";

type Props = {
  params: Promise<{ templateId: string }>
}

export default async function TemplatePage({ params }: Props) {
  const { templateId } = await params

  let templateData: Template | undefined = undefined
  if (templateId !== "new") {
    const { data, error } = await GetTemplateById({ templateId })
    if (error) {
      return (<p className="text-center py-4">Nu putem afisa acest sablon. Va rugam incercati mai tarziu</p>)
    }
    templateData = data
  }

  return (
    <TemplateProvider templateData={templateData}>
      <main>
        <PageContainer className="flex flex-col gap-4">
          <TemplateHeader />
          <TemplateForm />
        </PageContainer>
      </main>
    </TemplateProvider>
  )
}