import { Text } from "@/components/topography"
import { Card } from "@/components/ui/card"
import { getPlanDetailsByPlanId } from "@/constants/plans"
import { Subscription, SubscriptionPlan, User } from "@prisma/client"
import { PlanDetails } from "./plan-details"
import { ChangePlanDialog } from "./change-plan-dialog"
import { CancelSubscriptionDialog } from "./cancel-subscription-dialog"
import { ChangePlanSection } from "./change-plan-section"
import { CancelSubscriptionSection } from "./cancel-subscription-section"

type Props = {
  subscription?: Subscription,
  user: User
}

export const SubscriptionPlanCard: React.FC<Props> = ({ subscription, user }) => {
  const userPlanId = subscription?.plan || SubscriptionPlan.FREE
  const planAndDetails = getPlanDetailsByPlanId(userPlanId)

  const isCancelledAtPeriodEnd = subscription?.cancelAtPeriodEnd
  const userHasActivePaidPlan = subscription?.status === "ACTIVE" && userPlanId !== SubscriptionPlan.FREE

  return (
    <Card className="p-4 flex-col lg:flex-row items-start">
      <div className="flex flex-col gap-4 w-full lg:w-1/2">
        <div className="flex flex-col gap-2">
          <Text weight="semibold">
            Your current subscription
          </Text>
          <Text size="sm" className="text-muted-foreground">
            See what’s included in your active plan.
          </Text>
        </div>

        <div className="text-blue-600 py-1 bg-secondary rounded-full w-[150px] flex items-center justify-center">
          <Text weight="semibold">
            Active
          </Text>
        </div>

        <PlanDetails plan={planAndDetails} />

        {userHasActivePaidPlan && !isCancelledAtPeriodEnd &&
          <div className="flex flex-col gap-2">
            {subscription?.currentPeriodEnd &&
              <Text size="sm" className="text-muted-foreground">
                Next invoice date: {" "}
                {new Date(subscription?.currentPeriodEnd).toLocaleDateString()}
              </Text>
            }
            <Text size="sm" className="text-muted-foreground">
              Billing email: {user.email}
            </Text>
          </div>
        }

        {userHasActivePaidPlan && isCancelledAtPeriodEnd &&
          <div className="flex flex-col gap-2">
            {subscription?.currentPeriodEnd &&
              <Text size="sm" className="" weight="bold">
                Your subscription will be cancelled on {" "}
                {new Date(subscription?.currentPeriodEnd).toLocaleDateString()}
              </Text>
            }
          </div>
        }
      </div>

      <div className="w-full lg:w-1/2 flex flex-col gap-2 justify-end">
        <ChangePlanSection userPlanId={userPlanId} />
        {(subscription && !subscription.cancelAtPeriodEnd) &&
          <CancelSubscriptionSection subscription={subscription} />
        }
      </div>
    </Card>
  )
}
