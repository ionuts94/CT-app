import { createClient } from "@/lib/supabase/server";
import AuthService from "../auth";
import { Signature } from "@prisma/client";

export async function getAuthUserSignatures(): Promise<Signature[]> {
  const supabase = await createClient()
  const authUser = await AuthService.getAuthUser()

  const { data, error } = await supabase.from("signatures").select("*").eq("userId", authUser?.id)

  if (error) throw new Error(error.message)

  return data
}