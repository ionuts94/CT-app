import { Text } from "@/components/topography"
import { Card } from "@/components/ui/card"

type Props = {

}

export const ReferralsTable: React.FC<Props> = ({ }) => {
  return (
    <Card className="p-4">
      <div className="flex flex-col gap-1">
        <Text weight="bold" size="xl">Referrals</Text>
        <Text className="text-color-secondary" size="sm">A clean overview of referred customers, their status, revenue, and your commission.</Text>
      </div>
    </Card>
  )
}