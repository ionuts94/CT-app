import { createClient } from "@/lib/supabase/server"
import { T_CreateUserPayload } from "@/types/services/users"

export async function createUserRecord({ id, email, firstName, lastName }: T_CreateUserPayload) {
  const supabase = await createClient()

  const { data, error } = await supabase.from("users").insert({
    id,
    email,
    firstName,
    lastName,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
    .select("*")
    .maybeSingle()

  if (error) throw (error.message)
  return data
}