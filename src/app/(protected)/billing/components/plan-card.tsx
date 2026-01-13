import { Text } from "@/components/topography"
import { Card } from "@/components/ui/card"
import { FEATURES, getPlanDetailsByPlanId } from "@/constants/plans"
import { Subscription, SubscriptionPlan } from "@prisma/client"
import { CircleCheck } from "lucide-react"

type Props = {
  subscription?: Subscription
}

export const PlanCard: React.FC<Props> = ({ subscription }) => {
  const userPlanId = subscription?.plan || SubscriptionPlan.BUSINESS
  const planAndDetails = getPlanDetailsByPlanId(userPlanId)

  return (
    <Card className="p-4">
      <div className="flex flex-col gap-2">
        <Text weight="semibold">Abonamentul tau curent</Text>
        <Text size="sm" className="text-muted-foreground">Vezi ce este inclus in planul tau activ.</Text>
      </div>
      <div className="text-blue-600 py-1 bg-secondary rounded-full w-[150px] flex items-center justify-center">
        <Text weight="semibold">
          Activ
        </Text>
      </div>
      <div>
        <Text size="2xl" weight="bold">{planAndDetails?.label}</Text>
        <Text size="lg" weight="bold">
          {planAndDetails?.price} {planAndDetails?.currency} /  lună
        </Text>
      </div>
      <div className="flex flex-col gap-2">
        <Text className="text-muted-foreground" size="sm">Planul include: </Text>
        <div className="flex flex-col gap-2">
          <PlanFeatureItem>
            {planAndDetails?.contracts.count} contracte
            {planAndDetails?.contracts.period ? " / " + planAndDetails?.contracts.period : "gratuite"}
          </PlanFeatureItem>
          {planAndDetails?.features.map(feature => (
            <PlanFeatureItem key={feature}>
              {FEATURES[feature]}
            </PlanFeatureItem>
          ))}
        </div>
      </div>
    </Card>
  )
}

type PlanFeatureItemProps = {
  children: React.ReactNode
}

const PlanFeatureItem: React.FC<PlanFeatureItemProps> = ({ children }) => {
  return (
    <Text className="flex gap-1 items-center" size="sm">
      <CircleCheck size={16} className="text-white fill-chart-2" />
      {children}
    </Text>
  )
}