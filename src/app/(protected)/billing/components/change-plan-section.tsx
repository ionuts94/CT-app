import { Text } from "@/components/topography"
import { ChangePlanDialog } from "./change-plan-dialog"
import { SubscriptionPlan } from "@prisma/client"

type Props = {
    userPlanId: SubscriptionPlan
}

export const ChangePlanSection: React.FC<Props> = ({ userPlanId }) => {
    return (
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
    )
}