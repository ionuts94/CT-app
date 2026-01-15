import { createClient } from "@/lib/supabase/server";
import { Subscription } from "@prisma/client";

export async function getByStripeSubscriptionId(stripeSubscriptionId: string): Promise<Subscription> {
    const supabase = await createClient()
    const { data, error } = await supabase.from("subscriptions")
        .select("*")
        .eq("stripeSubscriptionId", stripeSubscriptionId)
        .maybeSingle()

    if (error) {
        throw new Error(error.message)
    }

    return data
}