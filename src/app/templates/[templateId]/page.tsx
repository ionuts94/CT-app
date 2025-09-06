import { PageContainer } from "@/components/layout";
import { TemplateHeader } from "./components/template-header";
import { TemplateForm } from "./components/template-form";
import { AITemplateContext } from "@/contexts/template-assistant-context";

export default async function TemplatePage() {
  return (
    <AITemplateContext>
      <main>
        <PageContainer className="flex flex-col gap-4">
          <TemplateHeader />
          <TemplateForm />
        </PageContainer>
      </main>
    </AITemplateContext>
  )
}