import AuthService from "../auth";
import { createClient } from "@/lib/supabase/server";
import { Template } from "@prisma/client";

export async function getTemplateById({ templateId }: { templateId: string }): Promise<Template> {
  const supabase = await createClient();
  const authUser = await AuthService.getAuthUser()

  const { data, error } = await supabase.from("templates")
    .select("*")
    .eq("id", templateId)
    .eq("userId", authUser.id)
    .maybeSingle()

  if (error) throw new Error(error.message)

  return data
}