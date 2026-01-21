import { createClient } from "@/lib/supabase/server"
import { T_CreateContractAllowancePayload } from "@/types/services/contract-allowance"
import { ContractAllowance } from "@prisma/client"
import { PostgrestSingleResponse } from "@supabase/supabase-js"

export async function createContractAllowance(payload: T_CreateContractAllowancePayload) {
    const supabase = await createClient()

    const { data, error }: PostgrestSingleResponse<ContractAllowance | null> = await supabase.from("contract_allowance")
        .insert({
            source: payload.source,
            userId: payload.userId,
            expiresAt: payload.expiresAt,
        })
        .select("*")
        .maybeSingle()

    if (error) throw new Error(`Failed to create contract allowance for user '${payload.userId}'. Error: ${error.message}`)
    return data
}