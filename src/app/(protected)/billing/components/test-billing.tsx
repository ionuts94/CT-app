"use client"

import { ButtonWithLoading } from "@/components/button-with-loading"
import { STRIPE_PRICES } from "@/constants/stripe"
import CTBilling from "@/sdk/billing"
import { toast } from "sonner"

type Props = {

}

export const TestStripeButton: React.FC<Props> = ({ }) => {
    const handleClick = async () => {
        const { data, error } = await CTBilling.createCheckoutSession({ priceId: STRIPE_PRICES.STARTER.prices.monthly.priceId })
        if (error) return toast.error(error)
        window.location.href = data.redirectUrl
    }
    return (
        <div>
            <ButtonWithLoading onClick={handleClick}>Test checkout</ButtonWithLoading>
        </div>
    )
}