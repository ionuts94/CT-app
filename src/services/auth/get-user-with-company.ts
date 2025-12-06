import { createClient } from "@/lib/supabase/server";

export async function getUserWithCompany() {
  const supabase = await createClient();

  const {
    data: { user: authUser },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !authUser) {
    throw new Error("Unauthorized: user is not authenticated.");
  }

  // 2️⃣ Fetch user row + the company joined
  const { data: profile, error } = await supabase
    .from("users")
    .select("*, company: companies(*)")
    .eq("id", authUser.id)
    .maybeSingle();

  if (error) {
    throw new Error("Failed to load user with company: " + error.message);
  }

  if (!profile) {
    throw new Error("Authenticated user not found in database.");
  }

  return profile;
}
