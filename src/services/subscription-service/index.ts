import { createFromStripeSubscription } from "./create-from-stripe-subscription";
import { deactiaveUserActiveSubscriptions } from "./deactivate-user-active-subscriptions";
import { getByStripeSubscriptionId } from "./get-by-stripe-subscription-id";
import { resolveUserIdByStripeCustomerId } from "./resolve-user-id-by-stripe-customer-id";
import { updateById } from "./update-by-id";
import { upsertFromStripeCheckout } from "./upsert-from-stripe-checkout";

const SubscriptionService = {
    upsertFromStripeCheckout,
    getByStripeSubscriptionId,
    updateById,
    resolveUserIdByStripeCustomerId,
    createFromStripeSubscription,
    deactiaveUserActiveSubscriptions
}

export default SubscriptionService