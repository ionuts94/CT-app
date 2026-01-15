import { createClient } from "@/lib/supabase/server";
import Stripe from "stripe";

export async function createEvent(event: Stripe.Event) {
    const supabase = await createClient()

    const { error } = await supabase
        .from("stripe_events")
        .insert({
            stripeEventId: event.id,
            type: event.type,
            livemode: event.livemode,
        })

    if (error?.code === "23505") {
        return false
    }

    return true
}