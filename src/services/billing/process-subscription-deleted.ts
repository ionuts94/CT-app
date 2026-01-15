import Stripe from "stripe"
import SubscriptionService from "../subscription-service"
import { SubscriptionStatus } from "@prisma/client"

export async function processSubscriptionDeleted(event: Stripe.Event) {
    const subscription = event.data.object as Stripe.Subscription & {
        canceled_at: number | null
    }

    const stripeSubscriptionId = subscription.id
    if (!stripeSubscriptionId) return

    const existing = await SubscriptionService.getByStripeSubscriptionId(
        stripeSubscriptionId
    )

    if (!existing) {
        console.warn(
            "subscription.deleted but subscription not found",
            stripeSubscriptionId
        )
        return
    }

    await SubscriptionService.updateById(existing.id, {
        status: SubscriptionStatus.CANCELED,
        canceledAt: subscription.canceled_at
            ? new Date(subscription.canceled_at * 1000)
            : new Date(),
        cancelAtPeriodEnd: false,
    })
}
