import { PageContainer } from "@/components/layout";
import { TemplatesHeader } from "./components/templates-header";
import { TemplatesList } from "./components/templates-list";
import { TemplatesFilterBar } from "./components/templates-filter-bar";

export default async function TemplatesPage() {
  return (
    <main>
      <PageContainer className="flex flex-col gap-4">
        <TemplatesHeader />
        <TemplatesFilterBar />
        <TemplatesList />
      </PageContainer>
    </main>
  )
}