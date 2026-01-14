import { stripe } from "@/lib/stripe"
import { createClient } from "@/lib/supabase/server"
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
            case "customer.subscription.created":
            case "customer.subscription.updated":
            case "customer.subscription.deleted":
            case "invoice.payment_succeeded":
            case "invoice.payment_failed":
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