import { PageContainer } from "@/components/layout";
import { TemplateHeader } from "./components/template-header";
import { TemplateForm } from "./components/template-form";
import { TemplateProvider } from "@/contexts/template-assistant-context";

export default async function TemplatePage() {
  return (
    <TemplateProvider>
      <main>
        <PageContainer className="flex flex-col gap-4">
          <TemplateHeader />
          <TemplateForm />
        </PageContainer>
      </main>
    </TemplateProvider>
  )
}