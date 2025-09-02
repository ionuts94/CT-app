import { Card } from "@/components/ui/card"
import { Text } from "@/components/topography"

type Props = {

}

export const AiTemplateReview: React.FC<Props> = ({ }) => {
  return (
    <Card className="p-4 flex flex-col gap-2">
      <Text size="xl" weight="semibold">AI Review</Text>
      <Text size="sm" weight="semibold" className="text-color-secondary">Consulta asistentul nostru in legatura cu sablonul tau.</Text>
    </Card>
  )
}