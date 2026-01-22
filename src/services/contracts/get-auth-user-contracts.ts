import AuthService from "../auth";
import { createClient } from "@/lib/supabase/server";
import { Contract } from "@prisma/client";

export async function getUserContracts({
  userId,
  status
}: {
  userId: string
  status?: string
}): Promise<Contract[]> {
  const supabase = await createClient()

  const query = supabase.from("contracts").select("*").eq("ownerId", userId)
  if (status) query.eq("status", status)

  const { data, error } = await query.order("createdAt", { ascending: false })
  if (error) throw new Error("Failed to retrieve contracts. Error: " + error.message)
  return data
}