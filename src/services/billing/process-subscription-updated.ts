import Stripe from "stripe"
import SubscriptionService from "../subscription-service"
import {
    mapPriceIdToPlan,
    mapStripeStatusToSubscriptionStatus,
} from "./utils"
import ContractAllowanceService from "../contract-allowance"
import { getPlanDetailsByStripePriceId } from "@/constants/plans"
import { dateUtils } from "@/lib/date-utils"

export async function processSubscriptionUpdated(event: Stripe.Event) {
    console.log("[billing] subscription.updated")

    const subscription = event.data.object as Stripe.Subscription
    const stripeSubscriptionId = subscription.id
    if (!stripeSubscriptionId) return

    const subscriptionItem = subscription.items.data[0]
    if (!subscriptionItem) {
        throw new Error("subscription.updated has no subscription item")
    }

    const stripePriceId = subscriptionItem.price.id
    const plan = mapPriceIdToPlan(stripePriceId)
    const status = mapStripeStatusToSubscriptionStatus(subscription.status)

    const existing = await SubscriptionService.getByStripeSubscriptionId(stripeSubscriptionId)

    if (!existing) {
        console.error(
            "[billing] subscription.updated but subscription not found",
            stripeSubscriptionId
        )
        return
    }

    const newPeriodStart = subscriptionItem.current_period_start
        ? new Date(subscriptionItem.current_period_start * 1000)
        : null

    const newPeriodEnd = subscriptionItem.current_period_end
        ? new Date(subscriptionItem.current_period_end * 1000)
        : null

    const isNewBillingCycle =
        newPeriodStart &&
        (!existing.currentPeriodStart ||
            newPeriodStart.getTime() !==
            new Date(existing.currentPeriodStart).getTime())

    await SubscriptionService.updateById(existing.id, {
        plan,
        status,
        stripePriceId,
        currentPeriodStart: newPeriodStart,
        currentPeriodEnd: newPeriodEnd,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        canceledAt: subscription.canceled_at
            ? new Date(subscription.canceled_at * 1000)
            : null,
    })

    if (!isNewBillingCycle || !newPeriodEnd) {
        return
    }

    const planDetails = getPlanDetailsByStripePriceId(stripePriceId)
    if (!planDetails) {
        console.warn(
            "[billing] subscription.updated refill skipped: unknown plan",
            stripePriceId
        )
        return
    }

    await ContractAllowanceService.refillContractAllowanceForUser({
        userId: existing.userId,
        allowanceCount: planDetails.contracts.count,
        source: "SUBSCRIPTION",
        expiresAt: dateUtils.toUTC(
            newPeriodEnd,
            dateUtils.getUserTimeZone()
        ),
        refillKey:
            subscriptionItem.id +
            ":" +
            subscriptionItem.current_period_start,
    })
}
