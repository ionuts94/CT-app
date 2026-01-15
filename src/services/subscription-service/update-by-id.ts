import { createClient } from "@/lib/supabase/server";
import { Subscription } from "@prisma/client";

export async function updateById(id: string, payload: Partial<Subscription>): Promise<Subscription> {
    const supabase = await createClient()
    const { data, error } = await supabase.from("subscriptions")
        .update(payload)
        .eq("id", id)
        .select("*")
        .maybeSingle()

    if (error) throw new Error(error.message)
    return data
}