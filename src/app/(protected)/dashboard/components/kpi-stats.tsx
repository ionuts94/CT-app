import { withSafeService } from "@/lib/services-utils/with-safe-service"
import { StatsCard } from "./stats-card"
import { KPI_CONTRACTS_DATA } from "@/mock-data/contracts"
import ReportingService from "@/services/reporting"
import { ReceiptText, Send, Signature } from "lucide-react"
import ContractAllowanceService from "@/services/contract-allowance"
import SubscriptionService from "@/services/subscription-service"
import { format } from "date-fns"
import { Text } from "@/components/topography"
import { Card } from "@/components/ui/card"

type Props = {
  userId: string
}

export const KPIStats: React.FC<Props> = async ({ userId }) => {
  const [
    { data: contractsSentData, error },
    { data: contractsSignedData },
    { data: contractAllowanceData },
    { data: subscriptionData }
  ] = await Promise.all([
    withSafeService(() => ReportingService.contract.getUserSentContractsForLastNDays({ userId, days: 30 })),
    withSafeService(() => ReportingService.contract.getUserSignedContractsForLastNDays({ userId, days: 30 })),
    withSafeService(() => ContractAllowanceService.getAvailableContractAllowances({ userId })),
    withSafeService(() => SubscriptionService.getUserSubscription({ userId }))
  ])

  return (
    <>
      <Card className="lg:hidden p-2 rounded-md flex-row justify-between">
        <Text size="sm" className="flex gap-1 items-center text-black/80">
          <ReceiptText size={14} />
          Remaining contracts
        </Text>
        <Text>
          {contractAllowanceData?.length || 0}
        </Text>
      </Card>
      <div className="hidden lg:flex gap-2 w-full">
        <StatsCard
          label="Contracts sent"
          Icon={Send}
          value={contractsSentData?.count || 0}
          hint="in the last 30 days"
        />
        <StatsCard
          label="Contracts signed"
          Icon={Signature}
          value={contractsSignedData?.count || 0}
          hint="in the last 30 days"
        />
        <StatsCard
          label="Remaining contracts"
          Icon={ReceiptText}
          value={contractAllowanceData?.length || 0}
          hint={subscriptionData?.currentPeriodEnd ? "Until " + format(subscriptionData.currentPeriodEnd, "dd.MM.yyyy") : ""}
        />
        {/* {KPI_CONTRACTS_DATA.map((data, index) => (
        <StatsCard
          key={index}
          label={data.label}
          value={data.value}
          Icon={data.icon}
          hint={data.hint}
        />
      ))} */}
      </div>
    </>
  )
}