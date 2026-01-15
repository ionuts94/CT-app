import { processCheckoutCompleted } from "./process-checkout-completed"
import { processPaymentFailed } from "./process-payment-failed"
import { processPaymentSucceeded } from "./process-payment-succeed"
import { processSubscriptionCreated } from "./process-subscription-created"
import { processSubscriptionDeleted } from "./process-subscription-deleted"
import { processSubscriptionUpdated } from "./process-subscription-updated"

const BillingService = {
  processCheckoutCompleted,
  processSubscriptionCreated,
  processSubscriptionUpdated,
  processSubscriptionDeleted,
  processPaymentSucceeded,
  processPaymentFailed,
}

export default BillingService