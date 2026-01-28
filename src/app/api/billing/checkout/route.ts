import { envs } from "@/constants/envs"
import { isValidPriceId } from "@/constants/plans"
import { stripe } from "@/lib/stripe"
import UserService from "@/services/users"
import { Status } from "@/types/api-call"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    try {
        const { priceId } = await req.json()

        if (!priceId) throw new Error("Price id not provided in checkout request")
        if (!isValidPriceId(priceId)) throw new Error("Invalid price id provided")

        const userData = await UserService.getCurrentUserWithSubscription()

        let customerId = userData.user.stripeCustomerId
        if (!customerId) {
            const customer = await stripe.customers.create({
                email: userData.authUser.email,
                metadata: {
                    userId: userData.authUser.id,
                }
            })
            if (!customer) throw new Error("Stripe is unable to create new customer")
            await UserService.updateUser(userData.authUser.id, { stripeCustomerId: customer.id })
            customerId = customer.id
        }

        const checkoutSession = await stripe.checkout.sessions.create({
            customer: customerId,
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                }
            ],
            mode: "subscription",
            allow_promotion_codes: true,
            success_url: envs.NEXT_PUBLIC_URL + "/payment_success",
            cancel_url: envs.NEXT_PUBLIC_URL + "/billing",
            metadata: {
                userId: userData.authUser.id,
                priceId,
            }
        })

        return NextResponse.json({
            status: Status.SUCCESS,
            data: {
                redirectUrl: checkoutSession.url,
            }
        })
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({
            status: Status.FAILED,
            error: error.message
        })
    }
}