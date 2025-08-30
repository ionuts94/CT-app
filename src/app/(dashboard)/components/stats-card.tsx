
import { Card } from "@/components/ui/card"
import { Text } from "@/components/topography/index"
import { ForwardRefExoticComponent, RefAttributes } from "react"
import { LucideProps } from "lucide-react"

type Props = {
  label: string
  value: string | number
  hint?: string,
  Icon?: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}

export const StatsCard: React.FC<Props> = ({ label, Icon, value, hint }) => {
  return (
    <Card className="p-4 shadow-md w-full">
      <div className="flex justify-between items-center text-color-secondary">
        <Text size="sm" weight="semibold">
          {label}
        </Text>
        {Icon && <Icon size={18} />}
      </div>
      <Text
        size="2xl"
        weight="bold"
      >
        {value}
      </Text>
      {hint &&
        <Text size="sm" className="text-color-secondary">
          {hint}
        </Text>
      }
    </Card>
  )
}
