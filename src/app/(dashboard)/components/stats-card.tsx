
import { Card } from "@/components/ui/card"
import { Text } from "@/components/topography/index"

type Props = {
  label: string
  value: string | number
  hint?: string
}

export function StatsCard({ label, value, hint }: Props) {
  return (
    <Card className="p-4 shadow-md">
      <Text size="sm" variant="secondary">{label}</Text>
      <Text size="2xl" weight="semibold" className="mt-1">{value}</Text>
      {hint ? <Text size="sm" variant="secondary" className="mt-1">{hint}</Text> : null}
    </Card>
  )
}
