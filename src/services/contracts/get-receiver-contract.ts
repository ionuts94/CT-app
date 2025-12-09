import { createClient } from "@/lib/supabase/server"
import { T_ViewContract } from "@/types/services/contracts"

export async function getReceiverContract({ receiverToken }: { receiverToken: string }): Promise<T_ViewContract> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("contracts")
    .select(`
          *,
          company: companies(*),
          ownerSignature: contracts_ownerSignatureId_fkey(*),
          receiverSignature: contracts_receiverSignatureId_fkey(*),
          owner: users(*),
          currentVersion: contract_versions(*)
        `)
    .eq("receiverToken", receiverToken)
    .maybeSingle()

  if (error) throw Error(error.message)
  if (!data) throw Error("Contract not found")
  if (data && !data.company) throw Error("Company not found")

  return data as T_ViewContract
}