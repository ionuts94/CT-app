import { PageContainer } from "@/components/layout";
import { TemplatesHeader } from "./components/templates-header";
import { StatusFilter } from "../contracts/components/contracts-filter";
import { TemplatesList } from "./components/templates-list";

export default async function TemplatesPage() {
  return (
    <main>
      <PageContainer className="flex flex-col gap-4">
        <TemplatesHeader />
        <StatusFilter />
        <TemplatesList />
      </PageContainer>
    </main>
  )
}