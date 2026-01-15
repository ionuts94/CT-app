import { getPlanDetailsByStripePriceId } from "@/constants/plans"
import { SubscriptionStatus, SubscriptionPlan } from "@prisma/client"
import Stripe from "stripe"

export function mapStripeStatusToSubscriptionStatus(
    stripeStatus: Stripe.Subscription.Status
): SubscriptionStatus {
    switch (stripeStatus) {
        case "trialing":
            return SubscriptionStatus.TRIAL

        case "active":
            return SubscriptionStatus.ACTIVE

        case "past_due":
        case "unpaid":
            return SubscriptionStatus.PAST_DUE

        case "canceled":
            return SubscriptionStatus.CANCELED

        case "incomplete":
            return SubscriptionStatus.PENDING

        case "incomplete_expired":
            return SubscriptionStatus.EXPIRED

        case "paused":
            return SubscriptionStatus.PAST_DUE

        default:
            console.warn("Unknown Stripe subscription status", stripeStatus)
            return SubscriptionStatus.PENDING
    }
}


export function mapPriceIdToPlan(priceId: string): SubscriptionPlan {
    const plan = getPlanDetailsByStripePriceId(priceId)

    if (!plan || plan.type !== "subscription") {
        throw new Error(`Invalid subscription priceId: ${priceId}`)
    }

    return plan.id as SubscriptionPlan
}