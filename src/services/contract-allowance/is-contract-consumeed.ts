import { createClient } from "@/lib/supabase/server";

export async function isContractConsumed(contractId: string) {
    if (!contractId) throw new Error("Contract id not provided")

    const supabase = await createClient()

    const { data } = await supabase.from("contract_allowance")
        .select("id")
        .eq("contractId", contractId)
        .maybeSingle()

    if (data) return true;
    return false;
}