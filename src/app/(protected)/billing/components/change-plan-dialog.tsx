"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PLANS_AND_DETAILS } from "@/constants/plans"
import { PlanDetails } from "./plan-details"
import { SubscriptionPlan } from "@prisma/client"
import CTBilling from "@/sdk/billing"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useDialog } from "@/hooks/use-dialog"

type Props = {
    currentUserPlanId: SubscriptionPlan
}

export const ChangePlanDialog: React.FC<Props> = ({ currentUserPlanId }) => {
    const { isOpen, closeDialog, openDialog, toggleDialog } = useDialog()
    const router = useRouter()
    const availablePlans = Object.values(PLANS_AND_DETAILS).filter(item => item.type === "subscription")

    const handleChangePlan = async (priceId: string) => {
        const repsponse = await CTBilling.changePlan({ priceId })

        const { data, error } = repsponse
        console.log(repsponse)

        if (error) {
            toast.error("We’re unable to process the payment at the moment.")
            return
        }

        if (data?.redirectUrl) {
            window.location.href = data.redirectUrl
            return
        }

        toast.success("Your plan has been updated.")
        // TODO: Redirect user to a page where we tell them the plan has changed.
        closeDialog()
    }

    const isCurrentPlan = (planId: string) => planId === currentUserPlanId

    return (
        <Dialog open={isOpen} onOpenChange={toggleDialog}>
            <DialogTrigger asChild>
                <Button className="w-fit" onClick={openDialog}>
                    Change plan
                </Button>
            </DialogTrigger>
            <DialogContent className="!max-w-fit w-fit">
                <DialogHeader>
                    <DialogTitle>
                        Change plan
                    </DialogTitle>
                    <DialogDescription>
                        Choose the plan that best fits your team’s needs. You can change your plan at any time.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex gap-4">
                    {availablePlans.map(item => (
                        <Card key={item.label} className="p-4 w-[340px] justify-between">
                            <div className="flex flex-col gap-4">
                                <PlanDetails
                                    plan={item}
                                    isActive={isCurrentPlan(item.id)}
                                />
                            </div>
                            <Button
                                disabled={isCurrentPlan(item.id)}
                                onClick={() => handleChangePlan(item.stripePriceId)}
                            >
                                {isCurrentPlan(item.id)
                                    ? "Current plan"
                                    : `Choose ${item.label}`
                                }
                            </Button>
                        </Card>
                    ))}
                </div>

                <DialogDescription>
                    Upgrades take effect immediately. Downgrades will apply from your next billing cycle.
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}
