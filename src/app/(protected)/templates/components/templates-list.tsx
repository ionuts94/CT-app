import { TemplateCard } from "./template-card"
import Link from "next/link"
import { envs } from "@/constants/envs"
import { Template } from "@prisma/client"
import { NoTemplatesFound } from "./no-templates-found"

type Props = {
  templates: Template[]
}

export const TemplatesList: React.FC<Props> = async ({ templates }) => {
  if (!templates || templates.length < 1) {
    return (
      <div className="w-full flex h-full max-h-[300px] flex-col pt-20 items-center justify-center">
        <NoTemplatesFound />
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 w-full">
      {templates?.map((template, index) => (
        // <Link className="block" key={index} href={`${envs.NEXT_PUBLIC_URL}/templates/${template.id}`}>
        <TemplateCard key={index} template={template} />
        // </Link>
      ))}
    </div>
  )
}