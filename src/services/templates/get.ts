import { createClient } from "@/lib/supabase/server";

export async function get() {
  const supabase = await createClient()
}