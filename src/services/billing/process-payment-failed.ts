import Stripe from "stripe"
import SubscriptionService from "../subscription-service"
import { SubscriptionStatus } from "@prisma/client"

export async function processPaymentFailed(event: Stripe.Event) {
    const invoice = event.data.object as Stripe.Invoice & {
        subscription: string | null
    }

    const stripeSubscriptionId = invoice.subscription
    if (!stripeSubscriptionId) return

    const existing = await SubscriptionService.getByStripeSubscriptionId(
        stripeSubscriptionId
    )

    if (!existing) {
        console.warn(
            "invoice.payment_failed but subscription not found",
            stripeSubscriptionId
        )
        return
    }

    if (
        existing.status === SubscriptionStatus.ACTIVE ||
        existing.status === SubscriptionStatus.PENDING ||
        existing.status === SubscriptionStatus.TRIAL
    ) {
        await SubscriptionService.updateById(existing.id, {
            status: SubscriptionStatus.PAST_DUE,
        })
    }
}
