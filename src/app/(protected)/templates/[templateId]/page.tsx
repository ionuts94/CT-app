import { PageContainer } from "@/components/layout";
import { TemplateHeader } from "./components/template-header";
import { TemplateForm } from "./components/template-form";
import { TemplateProvider } from "@/contexts/template-assistant-context";
import { Template } from "@prisma/client";
import { withSafeService } from "@/lib/services-utils/with-safe-service";
import TemplateService from "@/services/templates";

type Props = {
  params: Promise<{ templateId: string }>
}

export default async function TemplatePage({ params }: Props) {
  const { templateId } = await params

  let templateData: Template | undefined = undefined
  if (templateId !== "new") {
    const { data, error } = await withSafeService(() => TemplateService.getTemplateById({ templateId }))
    if (error) {
      return (<p className="text-center py-4">Nu putem afisa acest sablon. Va rugam incercati mai tarziu</p>)
    }
    templateData = data || undefined
  }

  return (
    <TemplateProvider templateData={templateData}>
      <main>
        <PageContainer className="flex flex-col gap-4">
          <TemplateHeader templateId={templateData?.id} />
          <TemplateForm />
        </PageContainer>
      </main>
    </TemplateProvider>
  )
}