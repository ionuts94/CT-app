import Stripe from "stripe"
import SubscriptionService from "../subscription-service"
import {
    mapPriceIdToPlan,
    mapStripeStatusToSubscriptionStatus,
} from "./utils"

export async function processSubscriptionCreated(event: Stripe.Event) {
    console.log("[billing] subscription.created")

    const subscription = event.data.object as Stripe.Subscription

    const stripeSubscriptionId = subscription.id
    const stripeSubscriptionItemId = subscription.items.data[0].id

    if (!stripeSubscriptionId || !stripeSubscriptionItemId) {
        console.log("Returning early from processing subscription created")
        console.log("stripeSubscriptionId: ", stripeSubscriptionId)
        console.log("stripeSubscriptionItemId: ", stripeSubscriptionItemId)
    }

    const stripeCustomerId = subscription.customer as string | null
    if (!stripeCustomerId) {
        throw new Error("subscription.created missing stripe customer id")
    }

    const stripePriceId = subscription.items.data[0]?.price.id
    if (!stripePriceId) {
        throw new Error("subscription.created has no price")
    }

    const plan = mapPriceIdToPlan(stripePriceId)
    const status = mapStripeStatusToSubscriptionStatus(subscription.status)

    const userId =
        await SubscriptionService.resolveUserIdByStripeCustomerId(
            stripeCustomerId
        )

    if (!userId) {
        throw new Error(
            `subscription.created: cannot resolve user for customer=${stripeCustomerId}`
        )
    }

    const item = subscription.items.data[0]

    await SubscriptionService.createFromStripeSubscription({
        userId,
        plan,
        status,
        stripeCustomerId,
        stripeSubscriptionId,
        stripeSubscriptionItemId: item.id,
        stripePriceId,
        currentPeriodStart: item.current_period_start
            ? new Date(item.current_period_start * 1000)
            : null,
        currentPeriodEnd: item.current_period_end
            ? new Date(item.current_period_end * 1000)
            : null,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        canceledAt: subscription.canceled_at
            ? new Date(subscription.canceled_at * 1000)
            : null,
    })

}
