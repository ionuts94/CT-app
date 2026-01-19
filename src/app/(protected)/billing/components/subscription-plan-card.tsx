import { Text } from "@/components/topography"
import { Card } from "@/components/ui/card"
import { getPlanDetailsByPlanId } from "@/constants/plans"
import { Subscription, SubscriptionPlan, User } from "@prisma/client"
import { PlanDetails } from "./plan-details"
import { ChangePlanDialog } from "./change-plan-dialog"
import { CancelSubscriptionDialog } from "./cancel-subscription-dialog"

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

        {subscription?.status === "ACTIVE" && userPlanId !== SubscriptionPlan.FREE &&
          <div className="flex flex-col gap-2">
            {subscription?.currentPeriodEnd &&
              <Text size="sm" className="text-muted-foreground">
                Next invoice date:
                {new Date(subscription?.currentPeriodEnd).toLocaleDateString()}
              </Text>
            }
            <Text size="sm" className="text-muted-foreground">
              Billing email: {user.email}
            </Text>
          </div>
        }
      </div>

      <div className="w-1/2 flex flex-col gap-2 h-full justify-end">
        <div className="flex flex-col gap-2">
          <Text weight="bold">
            Change plan
          </Text>
          <Text size="sm" className="text-muted-foreground">
            Choose a different subscription plan based on your team&apos;s needs.
          </Text>

          <div className="border-[1px] broder-border rounded-md p-4 max-w-[550px] shadow-sm flex flex-col gap-2">
            <Text size="sm" weight="semibold">
              How upgrades work
            </Text>
            <div className="help-text element-inspector-selected flex flex-col gap-2">
              <Text size="sm" className="text-muted-foreground">
                • If you <strong>upgrade</strong>, you&apos;ll pay the difference <strong>immediately</strong>, and your billing period will reset.<br />
              </Text>
              <Text size="sm" className="text-muted-foreground">
                • The benefits of the new plan (contract limits, features, team members) are <strong>activated immediately</strong> after the change.
              </Text>
            </div>

            <Text size="sm" weight="semibold">
              How downgrades work
            </Text>
            <div className="help-text">
              <Text size="sm" className="text-muted-foreground">
                • If you <strong>downgrade</strong>, you won&apos;t be charged right now.<br />
              </Text>
              <Text size="sm" className="text-muted-foreground">
                • You&apos;ll stay on your current plan until the next <strong>billing date</strong>, when the new plan will take effect.
              </Text>
            </div>

            <ChangePlanDialog currentUserPlanId={userPlanId} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Text size="sm" weight="bold">
            Cancel subscription
          </Text>
          <Text size="sm" className="text-muted-foreground">
            You can cancel your subscription, but you&apos;ll keep access until the end of the paid period.
          </Text>

          <div className="border-[1px] broder-border rounded-md p-4 max-w-[550px] shadow-sm flex flex-col gap-2">
            <Text size="sm" weight="semibold">
              What happens when you cancel
            </Text>
            <div className="help-text element-inspector-selected flex flex-col gap-2">
              <Text size="sm" className="text-muted-foreground">
                • Your subscription remains <strong>active</strong> until the next <strong>billing date</strong>.<br />
              </Text>
              <Text size="sm" className="text-muted-foreground">
                • After that date, you won&apos;t be charged again and access to paid features will be disabled.
              </Text>
            </div>

            <CancelSubscriptionDialog />
          </div>
        </div>
      </div>
    </Card>
  )
}
