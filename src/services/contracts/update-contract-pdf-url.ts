import { createClient } from "@/lib/supabase/server";
import { T_ContractWithVersion } from "@/types/services/contracts";

export async function updateContractPdfUrl({
  contractId, pdfUrl
}: {
  contractId: string, pdfUrl: string
}): Promise<T_ContractWithVersion> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("contracts")
    .update({ signedPdfUrl: pdfUrl })
    .eq("id", contractId)
    .select("*, currentVersion: contract_versions(*)")
    .maybeSingle()

  if (error) throw new Error(error.message)
  return data
}