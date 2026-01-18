import Stripe from "stripe"
import SubscriptionService from "../subscription-service"
import {
    mapPriceIdToPlan,
    mapStripeStatusToSubscriptionStatus,
} from "./utils"

export async function processSubscriptionUpdated(event: Stripe.Event) {
    console.log("[billing] subscription.updated")
    console.log(event)

    const subscription = event.data.object as Stripe.Subscription

    const stripeSubscriptionId = subscription.id
    if (!stripeSubscriptionId) return

    const stripePriceId = subscription.items.data[0]?.price.id
    if (!stripePriceId) {
        throw new Error("subscription.updated has no price")
    }

    const plan = mapPriceIdToPlan(stripePriceId)
    const status = mapStripeStatusToSubscriptionStatus(subscription.status)

    const existing = await SubscriptionService.getByStripeSubscriptionId(
        stripeSubscriptionId
    )

    if (!existing) {
        console.error(
            "[billing] subscription.updated received but subscription not found",
            stripeSubscriptionId
        )
        return
    }

    const subscriptionItem = subscription.items.data[0]

    if (!subscriptionItem) {
        throw new Error("subscription.updated has no subscription item")
    }

    await SubscriptionService.updateById(existing.id, {
        plan,
        status,
        stripePriceId,
        currentPeriodStart: new Date(subscriptionItem.current_period_start * 1000),
        currentPeriodEnd: new Date(subscriptionItem.current_period_end * 1000),
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        canceledAt: subscription.canceled_at
            ? new Date(subscription.canceled_at * 1000)
            : null,
    })
}
