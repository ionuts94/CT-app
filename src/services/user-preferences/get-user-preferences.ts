import { createClient } from "@/lib/supabase/server";
import { UserPreferences } from "@prisma/client";

export async function getUserPreferences({ userId }: { userId: string }): Promise<UserPreferences> {
  const supabase = await createClient()
  const { data, error } = await supabase.from("user_preferences")
    .select("*")
    .eq("userId", userId)
    .maybeSingle()

  return data
}