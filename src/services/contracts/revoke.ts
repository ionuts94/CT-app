import { createClient } from "@/lib/supabase/server";
import { ContractStatus } from "@prisma/client";
import { T_ContractWithVersionAndOwner } from "@/types/services/contracts";
import ContractService from ".";

export async function revokeContract({
  contractId,
  failedReason
}: {
  contractId: string,
  failedReason?: string
}): Promise<T_ContractWithVersionAndOwner> {

  const supabase = await createClient();

  const contractData = await ContractService.getSenderContract({ contractId })

  if (!contractData) throw new Error("Contract not found")

  if (contractData.status !== "OUT_FOR_SIGNATURE") throw new Error("There is already an action taken on this contract. You cannot revoke contract at this stage.")

  const { data, error } = await supabase.from("contracts")
    .update({
      status: ContractStatus.REVOKED,
      failedReason,
      failedAt: new Date()
    })
    .eq("id", contractId)
    .select("*, currentVersion: contract_versions(*), owner: users(*)")
    .maybeSingle();

  if (error) throw new Error(error.message);

  return data;
}
