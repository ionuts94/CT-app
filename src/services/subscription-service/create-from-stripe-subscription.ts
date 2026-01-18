import { createClient } from "@/lib/supabase/server"
import { SubscriptionStatus, SubscriptionPlan } from "@prisma/client"

type CreateFromStripeSubscriptionInput = {
    userId: string
    stripeSubscriptionId: string
    stripeSubscriptionItemId: string
    stripeCustomerId: string
    stripePriceId: string
    plan: SubscriptionPlan
    status: SubscriptionStatus
    currentPeriodStart: Date | null,
    currentPeriodEnd: Date | null,
    cancelAtPeriodEnd: boolean
    canceledAt: Date | null
}

export async function createFromStripeSubscription(
    input: CreateFromStripeSubscriptionInput
) {
    const supabase = await createClient()

    const { error } = await supabase
        .from("subscriptions")
        .insert({
            userId: input.userId,
            plan: input.plan,
            status: input.status,
            stripeCustomerId: input.stripeCustomerId,
            stripeSubscriptionId: input.stripeSubscriptionId,
            stripePriceId: input.stripePriceId,
            currentPeriodStart: input.currentPeriodStart,
            currentPeriodEnd: input.currentPeriodEnd,
            cancelAtPeriodEnd: input.cancelAtPeriodEnd,
            canceledAt: input.canceledAt,
            stripeSubscriptionItemId: input.stripeSubscriptionItemId
        })

    // 🔁 idempotency: dacă a fost deja creată, ignorăm
    if (error?.code === "23505") {
        // duplicate key (stripeSubscriptionId)
        return
    }

    if (error) {
        throw error
    }
}
