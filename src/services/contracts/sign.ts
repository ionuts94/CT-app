import { createClient } from "@/lib/supabase/server";
import { T_ContractWithVersion, T_ReceiverSignContractPayload } from "@/types/services/contracts";
import { ContractStatus } from "@prisma/client";

export async function receiverSignContract({ contractId, receiverName, receiverSignatureId }: T_ReceiverSignContractPayload): Promise<T_ContractWithVersion> {
  const supabase = await createClient()
  const { data, error } = await supabase.from("contracts")
    .update({
      receiverName: receiverName,
      receiverSignatureId: receiverSignatureId,
      status: ContractStatus.FULLY_SIGNED,
    })
    .eq("id", contractId)
    .select("*, currentVersion: contract_versions(*)")
    .maybeSingle()

  if (error) throw new Error(error.message)
  return data
}