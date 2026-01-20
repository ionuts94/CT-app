import { cancelSubscription } from "./cancel-subscription"
import { changePlan } from "./change-plan"
import { createCheckoutSession } from "./create-checkout-session"

const CTBilling = {
    createCheckoutSession,
    changePlan,
    cancelSubscription
}

export default CTBilling
