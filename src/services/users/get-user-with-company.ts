import { createClient } from "@/lib/supabase/server";
import { T_UserWithCompany } from "@/types/services/users";

export async function getUserWithCompany({ userId }: { userId: string }): Promise<T_UserWithCompany> {
  const supabase = await createClient()

  const { data: profile, error } = await supabase
    .from("users")
    .select("*, company: companies(*)")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    throw new Error("Failed to load user with company: " + error.message);
  }

  if (!profile) {
    throw new Error("Authenticated user not found in database.");
  }

  return profile
}
