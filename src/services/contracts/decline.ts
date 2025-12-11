import { createClient } from "@/lib/supabase/server"
import { T_ContractWithVersion, T_FailContractPayload, } from "@/types/services/contracts"
import { ContractStatus } from "@prisma/client"

export async function declineContract({
  contractId,
  failedReason
}: T_FailContractPayload): Promise<T_ContractWithVersion> {
  const supabase = await createClient()
  const { data, error } = await supabase.from("contracts")
    .update({
      status: ContractStatus.DECLINED,
      failedReason,
      failedAt: new Date()
    })
    .eq("id", contractId)
    .select("*, currentVersion: contract_versions(*)")
    .maybeSingle()


  if (error) throw new Error(error.message)
  return data
}