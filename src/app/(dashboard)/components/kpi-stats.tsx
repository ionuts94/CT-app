import { CircleAlert, Hourglass, Send, Signature } from "lucide-react"
import { StatsCard } from "./stats-card"

type Props = {

}

export const KPIStats: React.FC<Props> = ({ }) => {
  return (
    <div className="flex gap-2 w-full">
      {CONTRACTS_DATA.map((data, index) => (
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

const CONTRACTS_DATA = [
  {
    label: "Contracte Trimise",
    icon: Send,
    value: 128,
    hint: "Luna asta"
  },
  {
    label: "Contracte Semnate",
    icon: Signature,
    value: 76,
    hint: "12% vs ultima luna"
  },
  {
    label: "Contracts Pending",
    icon: Hourglass,
    value: 34,
    hint: "Medie in pending: 3 zile"
  },
  {
    label: "Contracte Expirate",
    icon: CircleAlert,
    value: 6,
    hint: "Necesita atentie"
  },

] as const 