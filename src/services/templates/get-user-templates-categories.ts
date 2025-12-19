import { createClient } from "@/lib/supabase/server";
import AuthService from "../auth";

export async function getUserTemplatesCategories() {
  const supabase = await createClient();
  const authUser = await AuthService.getAuthUser()

  const { data: templatesCategories, error: templatesError } = await supabase.from("templates")
    .select("category")
    .eq("userId", authUser.id)

  if (templatesError) throw Error(templatesError.message)

  return templatesCategories
}