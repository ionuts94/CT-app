import { createClient } from "@/lib/supabase/server"
import { Company, Contract, ContractVersion, Signature, User } from "@prisma/client"
import { T_ContractForReceiver } from "./get-receiver-contract"


export async function getSenderContract({ contractId }: { contractId: string }): Promise<T_ContractForReceiver> {
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
    .eq("id", contractId)
    .maybeSingle()

  if (error) throw Error(error.message)
  if (!data) throw Error("Contract not found")
  if (data && !data.company) throw Error("Company not found")


  return data as T_ContractForReceiver
}