import { createClient } from "@/lib/supabase/server"

export async function resolveUserIdByStripeCustomerId(
    stripeCustomerId: string
): Promise<string | null> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from("users")
        .select("id")
        .eq("stripeCustomerId", stripeCustomerId)
        .single()

    if (error) {
        console.warn(
            "Failed to resolve user by stripeCustomerId",
            stripeCustomerId,
            error.message
        )
        return null
    }

    return data?.id ?? null
}
