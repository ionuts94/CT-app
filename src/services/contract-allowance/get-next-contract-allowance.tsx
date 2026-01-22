import { createClient } from "@/lib/supabase/server"
import { ContractAllowance } from "@prisma/client"

export async function getNextContractAllowance(userId: string): Promise<ContractAllowance> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("contract_allowance")
    .select("*")
    .eq("userId", userId)
    .is("consumedAt", null)
    .is("archivedAt", null)
    .or("expiresAt.is.null,expiresAt.gt.now()")
    .order("expiresAt", { ascending: true, nullsFirst: false })
    .order("createdAt", { ascending: true })
    .limit(1)
    .maybeSingle()

  if (error) {
    throw new Error(
      `Failed to fetch next contract allowance: ${error.message}`
    )
  }

  return data
}