import { stripe } from "@/lib/stripe"
import { createClient } from "@/lib/supabase/server"
import BillingServices from "@/services/billing"
import { Status } from "@/types/api-call"
import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const webhookSecret = ""

export async function POST(req: NextRequest) {
    const body = await req.text()
    const signature = req.headers.get("stripe-signature")!

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({
            status: Status.FAILED,
            error: error.message
        }, { status: 400 })
    }


    try {
        switch (event.type) {
            case "checkout.session.completed":
                await BillingServices.processCheckoutCompleted(event)
                break;
            case "customer.subscription.created":
                await BillingServices.processSubscriptionCreated(event)
                break
            case "customer.subscription.updated":
                await BillingServices.processSubscriptionUpdated(event)
                break
            case "customer.subscription.deleted":
                await BillingServices.processSubscriptionDeleted(event)
                break
            case "invoice.payment_succeeded":
                await BillingServices.processPaymentSucceeded(event)
                break
            case "invoice.payment_failed":
                await BillingServices.processPaymentFailed(event)
                break
        }


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