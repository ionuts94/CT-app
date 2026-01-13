import { createClient } from "@/lib/supabase/server";
import { User } from "@prisma/client";

export async function updateUser(userId: string, payload: Partial<User>): Promise<User> {
    const supabase = await createClient()
    const { data, error } = await supabase.from("users")
        .update(payload)
        .eq("id", userId)
        .select("*")
        .maybeSingle()

    if (error) throw new Error("Unable to update user. Error: " + error.message)
    return data
}