import { createClient } from "@/lib/supabase/server";
import { ContractDBInsertPayload } from "@/types/services/contracts";
import { Contract, ContractStatus } from "@prisma/client";

export async function createContract(payload: ContractDBInsertPayload): Promise<Contract> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("contracts")
    .insert({
      id: payload.id,
      title: payload.title,
      ownerId: payload.ownerId,
      companyId: payload.companyId ?? null,
      status: payload.status,

      createdAt: new Date(),
      updatedAt: new Date(),
      expiresAt: payload.expiresAt ? new Date(payload.expiresAt) : null,

      ownerSignatureId: payload.ownerSignatureId,
      receiverName: payload.receiverName,
      receiverEmail: payload.receiverEmail,

      currentVersionId: payload.currentVersionId,
    })
    .select("*")
    .maybeSingle();

  if (error) {
    throw new Error("Failed to insert contract: " + error.message);
  }

  return data;
}
