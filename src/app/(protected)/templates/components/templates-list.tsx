import { MOCK_TEMPLATES } from "@/mock-data/templates"
import { TemplateCard } from "./template-card"
import { GetTemplates } from "@/actions/get/templates"
import Link from "next/link"

type Props = {

}

export const TemplatesList: React.FC<Props> = async ({ }) => {
  const { data, error } = await GetTemplates()

  return (
    <div className="grid grid-cols-4 gap-2">
      {data?.map((template, index) => (
        <Link className="block" key={index} href={`${process.env.NEXT_PUBLIC_URL}/templates/${template.id}`}>
          <TemplateCard template={template} />
        </Link>
      ))}
    </div>
  )
}