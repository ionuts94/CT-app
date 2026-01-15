import Stripe from "stripe";
import { updateEvent } from "./update-event";

export async function markProcessed(event: Stripe.Event) {
    await updateEvent(event.id, {
        processedAt: new Date().toISOString(),
    })
}