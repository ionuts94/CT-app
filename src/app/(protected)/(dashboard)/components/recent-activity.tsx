import { Card } from "@/components/ui/card"
import { Text } from "@/components/topography"

type Props = {

}

export const RecentActivity: React.FC<Props> = ({ }) => {
  return (
    <Card className="p-4 w-1/3">
      <Text size="lg" weight="semibold">Evenimente Recente</Text>
    </Card>
  )
}