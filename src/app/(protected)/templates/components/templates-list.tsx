import { MOCK_TEMPLATES } from "@/mock-data/templates"
import { TemplateCard } from "./template-card"

type Props = {

}

export const TemplatesList: React.FC<Props> = ({ }) => {
  return (
    <div className="grid grid-cols-4 gap-2">
      {MOCK_TEMPLATES.map((template, index) => (
        <TemplateCard key={index} template={template} />
      ))}
    </div>
  )
}