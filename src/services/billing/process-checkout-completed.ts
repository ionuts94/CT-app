import Stripe from "stripe";
import SubscriptionService from "../subscription-service";

export async function processCheckoutCompleted(event: Stripe.Event) {
  console.log("Processing checkout complete")
  const session = event.data.object as Stripe.Checkout.Session

  if (session.mode !== "subscription") return;

  const userId = session.metadata?.userId
  if (!session.customer || !userId) {
    throw new Error("User id is not present in session metadata.")
  }

  const stripeSubscriptionId = session.subscription as string | null
  if (!stripeSubscriptionId) {
    throw new Error("checkout.session.completed missing subscription")
  }


  return;
}