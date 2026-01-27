import AuthService from "../auth";
import { createClient } from "@/lib/supabase/server";
import { Template } from "@prisma/client";

export async function getUserTemplates({ category }: { category?: string }): Promise<Template[]> {
  const supabase = await createClient();
  const authUser = await AuthService.getAuthUser()

  console.log("inside template service: get")
  console.log(category)
  console.log(authUser.id)

  const query = supabase.from("templates")
    .select("*")
    .eq("userId", authUser.id)

  if (category) query.eq("category", category)

  const { data: templates, error: templatesError } = await query

  if (templatesError) throw Error(templatesError.message)

  return templates
}