import { createClient } from "@/lib/supabase/server";
import { PartyRole } from "@prisma/client";

export type CreateContractVersionPayload = {
  contractId: string;
  versionId: string;
  content: string;
  createdByType?: PartyRole;
  versionNumber?: number;
};

export async function createContractVersion(payload: CreateContractVersionPayload) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("contract_versions")
    .insert({
      id: payload.versionId,
      contractId: payload.contractId,
      content: payload.content,
      createdByType: payload.createdByType ?? PartyRole.SENDER,
      versionNumber: payload.versionNumber ?? 1,
      createdAt: new Date(),
    });

  if (error) {
    throw new Error("Failed to create contract version: " + error.message);
  }

  return true;
}
