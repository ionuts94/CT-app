import { PageContainer } from "@/components/layout";
import { TemplatesHeader } from "./components/templates-header";
import { TemplatesList } from "./components/templates-list";
import { TemplatesFilterBar } from "./components/templates-filter-bar";
import TemplateService from "@/services/templates";

type Props = {
  searchParams: Promise<{
    category?: string
  }>
}

export default async function TemplatesPage({ searchParams }: Props) {
  const { category } = await searchParams

  const [
    data,
    categories
  ] = await Promise.all([
    TemplateService.getUserTemplates({ category }),
    TemplateService.getUserTemplatesCategories()
  ])

  return (
    <main>
      <PageContainer className="flex flex-col gap-4">
        <TemplatesHeader />
        <TemplatesFilterBar categories={categories || []} />
        <TemplatesList templates={data || []} />
      </PageContainer>
    </main>
  )
}