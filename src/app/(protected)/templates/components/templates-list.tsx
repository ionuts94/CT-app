import { TemplateCard } from "./template-card"
import Link from "next/link"
import { GetTemplates } from "@/actions/post/template"

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