import AuthService from "../auth";
import { createClient } from "@/lib/supabase/server";
import { Contract } from "@prisma/client";

export async function getAuthUserContracts({
  status
}: {
  status?: string
}): Promise<Contract[]> {
  const supabase = await createClient()

  const authUser = await AuthService.getAuthUser()
  const query = supabase.from("contracts").select("*").eq("ownerId", authUser.id)
  if (status) query.eq("status", status)

  const { data, error } = await query
  if (error) throw new Error("Failed to retrieve contracts. Error: " + error.message)
  return data
}