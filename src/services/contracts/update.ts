import { createClient } from "@/lib/supabase/server";
import { ContractDBInsertPayload } from "@/types/services/contracts";
import { Contract } from "@prisma/client";

export async function updateContract(payload: ContractDBInsertPayload): Promise<Contract> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("contracts")
    .update(payload)
    .eq("id", payload.id)
    .select("*")
    .maybeSingle()

  if (error) throw new Error("Failed to update contract. Error: " + error.message)

  return data
}