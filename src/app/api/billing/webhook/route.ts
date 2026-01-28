import { envs } from "@/constants/envs"
import { stripe } from "@/lib/stripe"
import BillingService from "@/services/billing"
import StripeEventService from "@/services/stripe-event"
import { Status } from "@/types/api-call"
import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const webhookSecret = envs.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
    console.log("Stripe called webhook")
    const body = await req.text()
    const signature = req.headers.get("stripe-signature")!

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
        console.log(event.type)
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({
            status: Status.FAILED,
            error: error.message
        }, { status: 400 })
    }

    const claimed = await StripeEventService.createEvent(event)
    if (!claimed) {
        return NextResponse.json({
            status: Status.FAILED,
            error: "Event already claimed"
        }, { status: 409 })
    }

    try {
        switch (event.type) {
            case "checkout.session.completed":
                await BillingService.processCheckoutCompleted(event)
                break;
            case "customer.subscription.created":
                await BillingService.processSubscriptionCreated(event)
                break
            case "customer.subscription.updated":
                await BillingService.processSubscriptionUpdated(event)
                break
            case "customer.subscription.deleted":
                await BillingService.processSubscriptionDeleted(event)
                break
            case "invoice.payment_succeeded":
                await BillingService.processPaymentSucceeded(event)
                break
            case "invoice.payment_failed":
                await BillingService.processPaymentFailed(event)
                break
        }

        await StripeEventService.markProcessed(event)

        return NextResponse.json({
            status: Status.SUCCESS,
            data: ''
        })
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({
            status: Status.FAILED,
            error: error.message
        })
    }
}