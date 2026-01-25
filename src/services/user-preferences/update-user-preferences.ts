import { createClient } from "@/lib/supabase/server";
import { UserPreferences } from "@prisma/client";

export async function updateUserPreferences(userId: string, payload: Partial<UserPreferences>): Promise<UserPreferences> {
  const supabase = await createClient()
  const { data, error } = await supabase.from("user_preferences")
    .update(payload)
    .eq("userId", userId)
    .select("*").maybeSingle()

  if (error) {
    console.error(`Failed to save preferences for user: '${userId}'. Payload: ${JSON.stringify(payload)}. Error: ${error.message}`)
    throw Error("Failed to save your preferences. Please try again later.")
  }

  return data
}