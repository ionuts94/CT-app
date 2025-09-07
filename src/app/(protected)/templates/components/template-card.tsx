import { Card } from "@/components/ui/card"
import { Template } from "@/mock-data/templates"
import { Text } from "@/components/topography"

type Props = {
  template: Template
}

export const TemplateCard: React.FC<Props> = ({ template }) => {
  return (
    <Card className="p-4 flex-col gap-2">
      <Text weight="bold">{template.title}</Text>
      <Text className="text-color-secondary">Actualizat {template.updatedAt}</Text>
      <div className="w-ful h-[150px] bg-blue-50 shadow-sm my-2" />
      <Text className="text-color-secondary">Folosit la {template.lastUsedAt}</Text>
      <Text className="text-color-secondary">Folosit de {template.usedCount} ori</Text>
    </Card>
  )
}