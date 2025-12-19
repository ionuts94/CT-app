import { createClient } from "@/lib/supabase/server";

export async function deleteTemplate({ templateId }: { templateId: string }) {
  const supabase = await createClient()
  const { error } = await supabase.from("templates")
    .delete()
    .eq("id", templateId)
    .maybeSingle()

  if (error) throw new Error("Failed to delete template. Error: " + error.message)
  return "OK"
}