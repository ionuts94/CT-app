import Stripe from "stripe"
import SubscriptionService from "../subscription-service"
import { SubscriptionStatus } from "@prisma/client"

export async function processPaymentSucceeded(event: Stripe.Event) {
    const invoice = event.data.object as Stripe.Invoice & {
        subscription: string | null
    }

    const stripeSubscriptionId = invoice.subscription as string | null
    if (!stripeSubscriptionId) return;

    if (invoice.status !== "paid") return;

    const existing = await SubscriptionService.getByStripeSubscriptionId(
        stripeSubscriptionId
    )

    if (!existing) {
        console.warn(
            "invoice.payment_succeeded but subscription not found",
            stripeSubscriptionId
        )
        return;
    }

    let nextStatus = existing.status

    if (
        existing.status === SubscriptionStatus.PENDING ||
        existing.status === SubscriptionStatus.PAST_DUE
    ) {
        nextStatus = SubscriptionStatus.ACTIVE
    }

    if (nextStatus !== existing.status) {
        await SubscriptionService.updateById(existing.id, {
            status: nextStatus,
        })
    }
}
