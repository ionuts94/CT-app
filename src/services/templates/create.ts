import { createClient } from "@/lib/supabase/server";
import AuthService from "../auth";
import { T_CreateTemplateSchema } from "@/validators/template.validator";
import { Template } from "@prisma/client";

export async function create({
  title,
  category,
  content
}: T_CreateTemplateSchema): Promise<Template> {
  const supabase = await createClient();
  const authUser = await AuthService.getAuthUser()

  const { data, error } = await supabase.from("templates").insert({
    userId: authUser?.id!,
    title,
    category,
    content,
    createdAt: new Date()
  })
    .select("*")
    .maybeSingle()

  if (error) throw new Error(error.message)

  return data
}