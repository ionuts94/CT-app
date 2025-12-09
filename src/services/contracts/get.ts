import { createClient } from "@/lib/supabase/server";
import { Company, Contract, User } from "@prisma/client";

export type T_ContractWithCompanyAndOwner = Contract & {
  company: Company,
  owner: User
}

export async function getContractWithCompanyAndOwner({
  contractId
}: {
  contractId: string
}): Promise<T_ContractWithCompanyAndOwner> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("contracts")
    .select(`
        *,
        company: companies(*),
        owner: users(*),
        currentVersionContent: contract_versions(*)
      `)
    .eq("id", contractId)
    .maybeSingle()

  if (error) throw Error(error.message)
  if (!data) throw Error("Contract not found")
  if (data && !data.company) throw Error("Company not found")

  return data
}