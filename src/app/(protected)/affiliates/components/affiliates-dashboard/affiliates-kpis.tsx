import { Card } from "@/components/ui/card"
import { Text } from "@/components/topography"

type Props = {

}

const STATS = [
  {
    title: "Available balance",
    value: "£1,420",
    description: "Next payoyt scheduled for 05 Feb 2026.",
  },
  {
    title: "Total Referrals",
    value: "18",
    description: "Users attributed to your affiliate account.",
  },
  {
    title: "Active customers",
    value: "11",
    description: "Referrals with an active subscription.",
  },
  {
    title: "Total earned",
    value: "£4,860",
    description: "Lifetime affiliate commission tracked by Pactly.",
  }
]

export const AffiliatesKPIS: React.FC<Props> = ({ }) => {
  return (
    <Card className="p-4 grid grid-cols-4">
      {STATS.map(item => (
        <AffiliateKPICard
          title={item.title}
          value={item.value}
          description={item.description}
        />
      ))}
    </Card>
  )
}

type AffiliateKPICardProps = {
  title: string,
  value: string,
  description: string,
}

export const AffiliateKPICard: React.FC<AffiliateKPICardProps> = ({ title, value, description }) => {
  return (
    <Card className="bg-app p-4 flex-col gap-2 group hover:bg-main-foreground cursor-pointer">
      <Text size="sm" className="text-color-secondary group-hover:text-main">{title}</Text>
      <Text weight="bold" size="2xl">{value}</Text>
      <Text size="sm" className="text-color-secondary group-hover:text-main">{description}</Text>
    </Card>
  )
}