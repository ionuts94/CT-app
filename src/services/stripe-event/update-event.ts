import { createClient } from "@/lib/supabase/server";

export async function updateEvent(
    stripeEventId: string,
    data: Record<string, any>
) {
    const supabase = await createClient()

    const { error } = await supabase
        .from("stripe_events")
        .update(data)
        .eq("stripeEventId", stripeEventId)

    if (error) {
        throw new Error(error.message)
    }
}