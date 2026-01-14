import Stripe from "stripe";

export async function processCheckoutCompleted(event: Stripe.Event) {
  const session = event.data.object as Stripe.Checkout.Session
  if (!session.customer || !session.metadata?.userId) {
    return
  }
  
}