import { getDefaultUserPreferences } from "@/constants/others";
import { createClient } from "@/lib/supabase/server";
import { UserPreferences } from "@prisma/client";

export async function upsertUserPreferences(userId: string, payload: Partial<UserPreferences>): Promise<UserPreferences> {
    const supabase = await createClient()

    const updatePayload = {
        ...getDefaultUserPreferences(userId),
        ...payload
    }

    console.log("Update payload")
    console.log(updatePayload)

    const { data, error } = await supabase.from("user_preferences")
        .upsert(
            updatePayload,
            {
                onConflict: "userId",
                ignoreDuplicates: false
            }
        )
        .select("*")
        .maybeSingle()

    if (error) {
        console.error(`Failed to save preferences for user: '${userId}'. Payload: ${JSON.stringify(payload)}. Error: ${error.message}`)
        throw Error("Failed to save your preferences. Please try again later.")
    }

    return data
}