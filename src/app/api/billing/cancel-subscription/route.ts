import { stripe } from "@/lib/stripe"
import SubscriptionService from "@/services/subscription-service"
import UserService from "@/services/users"
import { Status } from "@/types/api-call"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    try {
        const { subscription } =
            await UserService.getCurrentUserWithSubscription()

        if (!subscription) {
            throw new Error("No active subscription")
        }

        // 1️⃣ Stripe: cancel la final de perioadă
        await stripe.subscriptions.update(
            subscription.stripeSubscriptionId!,
            {
                cancel_at_period_end: true,
            }
        )

        await SubscriptionService.updateById(subscription.id, {
            cancelAtPeriodEnd: true
        })

        return NextResponse.json({
            status: Status.SUCCESS,
            data: {
                message: "Subscription will be canceled at period end",
            },
        })
    } catch (error: any) {
        console.error("[billing/cancel]", error)
        return NextResponse.json({
            status: Status.FAILED,
            error: error.message,
        })
    }
}
