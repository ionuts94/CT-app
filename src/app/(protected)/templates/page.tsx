import { PageContainer } from "@/components/layout";
import { TemplatesHeader } from "./components/templates-header";
import { TemplatesList } from "./components/templates-list";
import { TemplatesFilterBar } from "./components/templates-filter-bar";
import TemplateService from "@/services/templates";
import { withSafeService } from "@/lib/services-utils/with-safe-service";

type Props = {
  searchParams: Promise<{
    category?: string
  }>
}

export default async function TemplatesPage({ searchParams }: Props) {
  const { category } = await searchParams

  const [
    { data, error: dataError },
    { data: categories, error: categoriesError },
  ] = await Promise.all([
    withSafeService(() => TemplateService.getUserTemplates({ category })),
    withSafeService(() => TemplateService.getUserTemplatesCategories())
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