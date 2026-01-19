import { createClient } from "@/lib/supabase/server";
import { T_SingInWithPasswordPayload } from "@/types/services/auth";

export async function signInWithPassword({
  email,
  password
}: T_SingInWithPasswordPayload) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) throw new Error(`Authentication failed: ${error.message}`)

  return data.user
}