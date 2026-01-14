import { Text } from "@/components/topography"
import { Card } from "@/components/ui/card"
import { getPlanDetailsByPlanId } from "@/constants/plans"
import { Subscription, SubscriptionPlan, User } from "@prisma/client"
import { PlanDetails } from "./plan-details"
import { ChangePlanDialog } from "./change-plan-dialog"

type Props = {
  subscription?: Subscription,
  user: User
}

export const SubscriptionPlanCard: React.FC<Props> = ({ subscription, user }) => {
  const userPlanId = subscription?.plan || SubscriptionPlan.FREE
  const planAndDetails = getPlanDetailsByPlanId(userPlanId)

  return (
    <Card className="p-4 flex-row items-start">
      <div className="flex flex-col gap-4 w-1/2">
        <div className="flex flex-col gap-2">
          <Text weight="semibold">Abonamentul tau curent</Text>
          <Text size="sm" className="text-muted-foreground">Vezi ce este inclus in planul tau activ.</Text>
        </div>
        <div className="text-blue-600 py-1 bg-secondary rounded-full w-[150px] flex items-center justify-center">
          <Text weight="semibold">
            Activ
          </Text>
        </div>
        <PlanDetails plan={planAndDetails} />
        {subscription?.status === "ACTIVE" && userPlanId !== SubscriptionPlan.FREE &&
          <div className="flex flex-col gap-2">
            {subscription?.currentPeriodEnd &&
              <Text size="sm" className="text-muted-foreground">
                Urmatoarea factura:
                {new Date(subscription?.currentPeriodEnd).toLocaleDateString()}
              </Text>
            }
            <Text size="sm" className="text-muted-foreground">Email de facturare: {user.email}</Text>
          </div>
        }
      </div>

      <div className="w-1/2 flex flex-col gap-2 h-full justify-end">
        <Text size="sm" className="text-muted-foreground">Schimba planul</Text>
        <Text size="sm" className="text-muted-foreground">Poți alege un alt plan de abonament. Modificarea se va aplica imediat și va fi regularizată pe următoarea factură.</Text>
        <ChangePlanDialog currentUserPlanId={userPlanId} />
      </div>
    </Card>
  )
}