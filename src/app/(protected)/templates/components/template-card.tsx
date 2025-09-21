import { Card } from "@/components/ui/card"

import { Text } from "@/components/topography"
import { Template } from "@prisma/client"

type Props = {
  template: Template,
  className?: string
}

export const TemplateCard: React.FC<Props> = ({ template, className }) => {
  return (
    <Card className="p-4 flex-col gap-2 opacity-85 hover:opacity-100 transition hover:scale-[1.01] cursor-pointer">
      <Text weight="bold" className="text-ellipsis line-clamp-1">{template.title}</Text>
      <Text className="text-color-secondary">Actualizat la <span className="font-semibold">{new Date(template.updatedAt).toLocaleDateString()}</span></Text>
      <div className="w-ful h-[150px] bg-blue-50 shadow-sm my-2" />
      <Text className="text-color-secondary">Folosit la <span className="font-semibold">{template.lastUsedAt || "niciodata"}</span></Text>
      <Text className="text-color-secondary">Folosit de <span className="font-semibold">{template.usedCount || 0} ori</span></Text>
    </Card>
  )
}