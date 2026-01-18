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
import Stripe from "stripe"

export async function POST(req: NextRequest) {
    try {
        const { priceId } = await req.json()

        if (!priceId) {
            throw new Error("Price id not provided")
        }
        if (!isValidPriceId(priceId)) {
            throw new Error("Invalid price id")
        }

        const {
            authUser,
            user,
            subscription: currentSubscription,
        } = await UserService.getCurrentUserWithSubscription()

        // 1️⃣ Ensure Stripe customer
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

        // 2️⃣ USER ARE SUBSCRIPTION → CHANGE PLAN
        if (currentSubscription) {
            const currentPlan =
                getPlanDetailsByStripePriceId(
                    currentSubscription.stripePriceId!
                ) ?? PLANS_AND_DETAILS.FREE

            const newPlan =
                getPlanDetailsByStripePriceId(priceId)

            if (!newPlan) {
                throw new Error("Invalid selected plan")
            }

            const isUpgrade = newPlan.price > currentPlan.price

            const updated = await stripe.subscriptions.update(
                currentSubscription.stripeSubscriptionId!,
                {
                    items: [
                        {
                            id: currentSubscription.stripeSubscriptionItemId!,
                            price: priceId,
                        },
                    ],
                    proration_behavior: "none",
                    billing_cycle_anchor: isUpgrade ? "now" : "unchanged",
                    payment_behavior: "default_incomplete",
                    expand: ["latest_invoice"],
                }
            )

            const invoice = updated.latest_invoice as Stripe.Invoice | null

            if (invoice?.status === "open" && invoice.hosted_invoice_url) {
                return NextResponse.json({
                    status: Status.ACTION_REQUIRED,
                    data: {
                        redirectUrl: invoice.hosted_invoice_url,
                    },
                })
            }

            // ✅ No payment required (downgrade / same price)
            return NextResponse.json({
                status: Status.SUCCESS,
                data: {
                    message: "Subscription updated",
                },
            })
        }

        // 3️⃣ USER FĂRĂ SUBSCRIPTION → CHECKOUT
        const checkoutSession =
            await stripe.checkout.sessions.create({
                customer: customerId,
                line_items: [
                    {
                        price: priceId,
                        quantity: 1,
                    },
                ],
                mode: "subscription",
                success_url: envs.NEXT_PUBLIC_URL + "/payment_success",
                cancel_url: envs.NEXT_PUBLIC_URL + "/billing",
                metadata: {
                    userId: authUser.id,
                    priceId,
                },
            })

        return NextResponse.json({
            status: Status.SUCCESS,
            data: {
                redirectUrl: checkoutSession.url,
            },
        })
    } catch (error: any) {
        console.error("[billing/change-plan]", error)
        return NextResponse.json({
            status: Status.FAILED,
            error: error.message ?? "Unexpected error",
        })
    }
}
