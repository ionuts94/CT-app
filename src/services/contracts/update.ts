import { createClient } from "@/lib/supabase/server";
import { ContractDBInsertPayload } from "@/types/services/contracts";
import { Contract, ContractStatus } from "@prisma/client";

type ContractDBUpdatePayload = ContractDBInsertPayload & {
  status: ContractStatus
}

export async function updateContract(payload: ContractDBUpdatePayload): Promise<Contract> {
  const supabase = await createClient()

  console.log("Came to update contract")
  console.log(payload)

  const { data, error } = await supabase.from("contracts")
    .update({
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
      optionalMessage: payload.optionalMessage || "",
      signingDeadline: payload.signingDeadline || null
    })
    .eq("id", payload.id)
    .select("*")
    .maybeSingle()

  if (error) throw new Error("Failed to update contract. Error: " + error.message)

  return data
}