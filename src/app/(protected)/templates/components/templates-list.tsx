import { TemplateCard } from "./template-card"
import Link from "next/link"
import { envs } from "@/constants/envs"
import { Template } from "@prisma/client"

type Props = {
  templates: Template[]
}

export const TemplatesList: React.FC<Props> = async ({ templates }) => {

  return (
    <div className="grid grid-cols-4 gap-2">
      {templates?.map((template, index) => (
        <Link className="block" key={index} href={`${envs.NEXT_PUBLIC_URL}/templates/${template.id}`}>
          <TemplateCard template={template} />
        </Link>
      ))}
    </div>
  )
}