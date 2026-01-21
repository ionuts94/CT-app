import Stripe from "stripe"
import SubscriptionService from "../subscription-service"
import { SubscriptionStatus } from "@prisma/client"

export async function processPaymentSucceeded(event: Stripe.Event) {
    console.log("[billing] invoice.payment_succeeded 1")

    const invoice = event.data.object as Stripe.Invoice & {
        subscription: string | null
    }

    const stripeSubscriptionId =
        typeof invoice.parent?.subscription_details?.subscription === "string"
            ? invoice.parent?.subscription_details?.subscription
            : invoice.parent?.subscription_details?.subscription.id
    if (!stripeSubscriptionId) return

    // 2️⃣ Sanity check
    console.log("2")
    if (invoice.status !== "paid") return

    // 3️⃣ Găsim subscription-ul nostru
    const existing =
        await SubscriptionService.getByStripeSubscriptionId(stripeSubscriptionId)
    console.log("3: " + existing)

    if (!existing) {
        console.warn(
            "[billing] invoice.payment_succeeded but subscription not found",
            stripeSubscriptionId
        )
        return
    }

    // 4️⃣ Status → ACTIVE (dacă era pending / past_due)
    let shouldUpdate = false
    const updatePayload: Record<string, any> = {}

    console.log("4")

    if (
        existing.status === SubscriptionStatus.PENDING ||
        existing.status === SubscriptionStatus.PAST_DUE
    ) {
        updatePayload.status = SubscriptionStatus.ACTIVE
        shouldUpdate = true
    }

    console.log("Line items: ")
    console.log(JSON.stringify(invoice.lines.data[0]))

    console.log("5")

    // 5️⃣ 🔑 PERIODS (fallback garantat)
    const line = invoice.lines.data[0]
    if (line?.period?.start && line?.period?.end) {
        updatePayload.currentPeriodStart = new Date(
            line.period.start * 1000
        )
        updatePayload.currentPeriodEnd = new Date(
            line.period.end * 1000
        )
        shouldUpdate = true
    }

    // 6️⃣ Update doar dacă e ceva de făcut

    console.log("6")
    console.log(updatePayload)
    if (shouldUpdate) {
        await SubscriptionService.updateById(existing.id, updatePayload)
    }
}
