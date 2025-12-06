import { createClient } from "@/lib/supabase/server";
import { Contract, ContractStatus } from "@prisma/client";

export type ContractDBInsertPayload = {
  id: string;
  title: string;
  ownerId: string;
  companyId?: string | null;
  status: ContractStatus;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
  ownerSignatureId: string;
  receiverName: string;
  receiverEmail: string;
  optionalMessage?: string | null;
  currentVersionId: string;
};

export async function createContract(payload: ContractDBInsertPayload): Promise<Contract> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("contracts")
    .insert({
      id: payload.id,
      title: payload.title,
      ownerId: payload.ownerId,
      companyId: payload.companyId ?? null,
      status: ContractStatus.OUT_FOR_SIGNATURE,

      createdAt: new Date(),
      updatedAt: new Date(),
      expiresAt: payload.expiresAt,

      ownerSignatureId: payload.ownerSignatureId,
      receiverName: payload.receiverName,
      receiverEmail: payload.receiverEmail,
      optionalMessage: payload.optionalMessage ?? null,

      currentVersionId: payload.currentVersionId,
    })
    .select("*")
    .maybeSingle();

  if (error) {
    throw new Error("Failed to insert contract: " + error.message);
  }

  return data;
}
