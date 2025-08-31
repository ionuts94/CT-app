import { StatsCard } from "./stats-card"
import { KPI_CONTRACTS_DATA } from "@/mock-data/contracts"

type Props = {

}

export const KPIStats: React.FC<Props> = ({ }) => {
  return (
    <div className="flex gap-2 w-full">
      {KPI_CONTRACTS_DATA.map((data, index) => (
        <StatsCard
          key={index}
          label={data.label}
          value={data.value}
          Icon={data.icon}
          hint={data.hint}
        />
      ))}
    </div>
  )
}