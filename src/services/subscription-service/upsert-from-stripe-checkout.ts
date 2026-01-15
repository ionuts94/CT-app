import { createClient } from "@/lib/supabase/server";
import { Subscription } from "@prisma/client";

export async function upsertFromStripeCheckout(data: Partial<Subscription>) {
    const supabase = await createClient()
    const { error } = await supabase.from("subscriptions").upsert(data)

    if (error) throw new Error(error.message)
    return "OL"
}