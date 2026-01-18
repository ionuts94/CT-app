import { envs } from "@/constants/envs"
import {
    getPlanDetailsByStripePriceId,
    PLANS_AND_DETAILS,
} from "@/constants/plans"
import { isValidPriceId } from "@/constants/stripe"
import { stripe } from "@/lib/stripe"
import UserService from "@/services/users"
import { Status } from "@/types/api-call"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    try {
        const { priceId } = await req.json()

        if (!priceId) throw new Error("Price id not provided")
        if (!isValidPriceId(priceId)) throw new Error("Invalid price id")

        const {
            authUser,
            user,
            subscription: currentSubscription,
        } = await UserService.getCurrentUserWithSubscription()

        // Ensure Stripe customer
        let customerId = user.stripeCustomerId
        if (!customerId) {
            const customer = await stripe.customers.create({
                email: authUser.email,
                metadata: { userId: authUser.id },
            })

            await UserService.updateUser(authUser.id, {
                stripeCustomerId: customer.id,
            })

            customerId = customer.id
        }

        // User HAS subscription
        if (currentSubscription) {
            const currentPlan =
                getPlanDetailsByStripePriceId(
                    currentSubscription.stripePriceId!
                ) ?? PLANS_AND_DETAILS.FREE

            const newPlan =
                getPlanDetailsByStripePriceId(priceId)

            if (!newPlan) throw new Error("Invalid selected plan")

            const isDowngrade = newPlan.price < currentPlan.price

            // DOWNGRADE → no checkout
            if (isDowngrade) {
                await stripe.subscriptions.update(
                    currentSubscription.stripeSubscriptionId!,
                    {
                        items: [
                            {
                                id: currentSubscription.stripeSubscriptionItemId!,
                                price: priceId,
                            },
                        ],
                        proration_behavior: "none",
                        billing_cycle_anchor: "unchanged",
                    }
                )

                return NextResponse.json({
                    status: Status.SUCCESS,
                    data: { message: "Downgrade scheduled" },
                })
            }

            //  UPGRADE → CHECKOUT NOU
            const checkoutSession =
                await stripe.checkout.sessions.create({
                    customer: customerId,
                    mode: "subscription",
                    line_items: [{ price: priceId, quantity: 1 }],
                    success_url: envs.NEXT_PUBLIC_URL + "/payment_success",
                    cancel_url: envs.NEXT_PUBLIC_URL + "/billing",
                    metadata: {
                        userId: authUser.id,
                        action: "upgrade",
                        previousSubscriptionId:
                            currentSubscription.stripeSubscriptionId,
                    },
                })

            return NextResponse.json({
                status: Status.SUCCESS,
                data: { redirectUrl: checkoutSession.url },
            })
        }

        // User has NO subscription → normal checkout
        const checkoutSession =
            await stripe.checkout.sessions.create({
                customer: customerId,
                mode: "subscription",
                line_items: [{ price: priceId, quantity: 1 }],
                success_url: envs.NEXT_PUBLIC_URL + "/payment_success",
                cancel_url: envs.NEXT_PUBLIC_URL + "/billing",
                metadata: {
                    userId: authUser.id,
                    action: "new",
                },
            })

        return NextResponse.json({
            status: Status.SUCCESS,
            data: { redirectUrl: checkoutSession.url },
        })
    } catch (error: any) {
        console.error("[billing/change-plan]", error)
        return NextResponse.json({
            status: Status.FAILED,
            error: error.message ?? "Unexpected error",
        })
    }
}
