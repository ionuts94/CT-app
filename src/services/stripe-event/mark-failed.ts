import Stripe from "stripe";
import { updateEvent } from "./update-event";

export async function markFailed(event: Stripe.Event, error: Error) {
    await updateEvent(event.id, {
        failedAt: new Date().toISOString(),
        errorMessage: error.message,
    })
}