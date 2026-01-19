import { Text } from "@/components/topography"
import { FEATURES, T_PlanDetails } from "@/constants/plans"
import { CircleCheck } from "lucide-react"

type Props = {
    plan: T_PlanDetails,
    isActive?: boolean
}

export const PlanDetails: React.FC<Props> = ({ plan, isActive }) => {
    return (
        <>
            <div className="flex items-center justify-between">
                <div>
                    <Text size="2xl" weight="bold">{plan?.label}</Text>
                    <Text size="lg" weight="bold">
                        {plan?.price} {plan?.currency} / month
                    </Text>
                </div>
                {isActive &&
                    <div className="bg-secondary px-8 py-2 rounded-full">
                        <Text weight="bold" className="text-blue-700">
                            Active
                        </Text>
                    </div>
                }
            </div>

            <div className="flex flex-col gap-2">
                <Text className="text-muted-foreground" size="sm">
                    This plan includes:
                </Text>
                <div className="flex flex-col gap-2">
                    <PlanFeatureItem>
                        {plan?.contracts.count} contracts
                        {plan?.contracts.period
                            ? " / " + plan?.contracts.period
                            : " included"}
                    </PlanFeatureItem>
                    {plan?.features.map(feature => (
                        <PlanFeatureItem key={feature}>
                            {FEATURES[feature]}
                        </PlanFeatureItem>
                    ))}
                </div>
            </div>
        </>
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
