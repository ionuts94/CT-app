import { PageContainer } from "@/components/layout";
import { TemplatesHeader } from "./components/templates-header";
import { TemplatesList } from "./components/templates-list";
import { TemplatesFilterBar } from "./components/templates-filter-bar";
import { GetUserTemplates } from "@/actions/post/template";
import { GetUserTemplatesCategories } from "@/actions/post/template/templates-categories";

type Props = {
  searchParams: Promise<{
    category?: string
  }>
}

export default async function TemplatesPage({ searchParams }: Props) {
  const { category } = await searchParams
  const [
    { data, error },
    { data: categories, error: categoriesError }
  ] = await Promise.all([
    GetUserTemplates({ category }),
    GetUserTemplatesCategories()
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