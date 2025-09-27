import { T_ViewContract } from "@/actions/post/contracts"
import { PageWidth } from "@/components/layout"
import { Text } from "@/components/topography"
import { Clock } from "lucide-react"
import { ContractContentView } from "./contract-content-view"

type Props = {
  contract: T_ViewContract
}

export const PageHeader: React.FC<Props> = ({ contract }) => {
  return (
    <div>
      <PageWidth className="px-[70px] flex items-center justify-between bg-white py-6 border-b-[1px] shadow-sm">
        <div className="flex gap-2 items-center">
          {contract?.company?.logoUrl &&
            <img src={contract.company.logoUrl} alt="company logo" className="h-[40px] w-fit" />
          }
          <Text size="xl" className="text-black/80">{contract.company.name}</Text>
        </div>
        <Text size="2xl" weight="bold">
          {contract.title}
        </Text>
        <div className="flex items-center gap-2 rounded-full border px-2 py-1 bg-input">
          <Clock className="size-4" />
          <Text size="sm">Awaiting signature</Text>
        </div>
      </PageWidth>
    </div>
  )
}