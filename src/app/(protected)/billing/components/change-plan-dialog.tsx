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
            toast.error("Nu putem procesa plata în acest moment.")
            return
        }

        if (data?.redirectUrl) {
            window.location.href = data.redirectUrl
            return
        }

        toast.success("Planul a fost actualizat.")
        // TODO: Redirect user to a page where we tell them the plan has changed.
        closeDialog()
    }

    const isCurrentPlan = (planId: string) => planId === currentUserPlanId

    return (
        <Dialog open={isOpen} onOpenChange={toggleDialog}>
            <DialogTrigger asChild>
                <Button className="w-fit" onClick={openDialog}>
                    Schimbă planul
                </Button>
            </DialogTrigger>
            <DialogContent className="!max-w-fit w-fit">
                <DialogHeader>
                    <DialogTitle>Schimbă planul</DialogTitle>
                    <DialogDescription>Alege planul care se potrivește cel mai bine nevoilor echipei tale. Poți schimba planul oricând.</DialogDescription>
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
                                    ? `Plan curent`
                                    : `Alege ${item.label}`

                                }
                            </Button>
                        </Card>
                    ))}
                </div>
                <DialogDescription>
                    Upgrade-ul se aplică imediat. Downgrade-ul de la următoarea factură.
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}