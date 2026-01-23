import { Text } from "@/components/topography"
import { CancelSubscriptionDialog } from "./cancel-subscription-dialog"
import { Subscription } from "@prisma/client"

type Props = {
    subscription: Subscription
}

export const CancelSubscriptionSection: React.FC<Props> = ({ subscription }) => {
    return (
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
    )
}