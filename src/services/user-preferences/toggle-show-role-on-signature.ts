import { createClient } from "@/lib/supabase/server";
import { UserPreferences } from "@prisma/client";
import { PostgrestMaybeSingleResponse } from "@supabase/supabase-js";

export async function toggleShowRoleOnSignature({ userId }: { userId: string }) {
  const supabase = await createClient()
  const { data: currentPrefData, error }: PostgrestMaybeSingleResponse<UserPreferences> = await supabase.from("user_preferences")
    .select("*")
    .eq("userId", userId)
    .maybeSingle()

  const { data: newPrefData, error: newPrefDataError } = await supabase.from("user_preferences")
    .update({ showRoleOnSignature: !currentPrefData?.showRoleOnSignature })
    .eq("userId", userId)

  return newPrefData
}