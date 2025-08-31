import { PageContainer } from "@/components/layout";
import { TemplateHeader } from "./components/template-header";
import { TemplateForm } from "./components/template-form";

export default async function TemplatePage() {
  return (
    <main>
      <PageContainer className="flex flex-col gap-4">
        <TemplateHeader />
        <TemplateForm />
      </PageContainer>
    </main>
  )
}