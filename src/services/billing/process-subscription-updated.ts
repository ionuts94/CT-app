import Stripe from "stripe"
import SubscriptionService from "../subscription-service"
import { mapPriceIdToPlan, mapStripeStatusToSubscriptionStatus } from "./utils"

export async function processSubscriptionUpdated(event: Stripe.Event) {
    const subscription = event.data.object as Stripe.Subscription & {
        current_period_start: number
        current_period_end: number
        cancel_at_period_end: boolean
        canceled_at: number | null
    }

    const stripeSubscriptionId = subscription.id
    if (!stripeSubscriptionId) return

    const stripeCustomerId = subscription.customer as string | null
    if (!stripeCustomerId) {
        throw new Error("subscription.updated missing stripe customer id")
    }

    const stripePriceId = subscription.items.data[0]?.price.id
    if (!stripePriceId) {
        throw new Error("Subscription has no price")
    }

    const plan = mapPriceIdToPlan(stripePriceId)
    const status = mapStripeStatusToSubscriptionStatus(subscription.status)

    const payload = {
        plan,
        status,
        stripePriceId,
        stripeSubscriptionId,
        stripeCustomerId,
        currentPeriodStart: new Date(subscription.current_period_start * 1000),
        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        canceledAt: subscription.canceled_at
            ? new Date(subscription.canceled_at * 1000)
            : null,
    }

    const existing = await SubscriptionService.getByStripeSubscriptionId(
        stripeSubscriptionId
    )

    // 🔥 CASE 1: subscription NU există încă (out-of-order events)
    if (!existing) {
        // rezolvăm userId din customer
        const userId =
            await SubscriptionService.resolveUserIdByStripeCustomerId(
                stripeCustomerId
            )

        if (!userId) {
            throw new Error(
                `Cannot create subscription without userId (customer=${stripeCustomerId})`
            )
        }

        await SubscriptionService.createFromStripeSubscription({
            userId,
            ...payload,
        })

        return
    }

    // 🔁 CASE 2: subscription există → update normal
    await SubscriptionService.updateById(existing.id, payload)
}
