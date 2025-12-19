import { createClient } from "@/lib/supabase/server";
import { Template } from "@prisma/client";

export async function update(template: Template): Promise<Template> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("templates")
    .update(template)
    .eq("id", template.id)
    .select("*")
    .maybeSingle()

  if (error) throw new Error(error.message)

  return data
}