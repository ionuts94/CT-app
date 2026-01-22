import { createClient } from "@/lib/supabase/server"
import { ContractAllowance } from "@prisma/client"

export async function getAvailableContractAllowances(userId: string): Promise<ContractAllowance[]> {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from("contract_allowance")
        .select("*")
        .eq("userId", userId)
        .is("consumedAt", null)
        .is("archivedAt", null)
        .or("expiresAt.is.null,expiresAt.gt.now()")
        .order("expiresAt", { ascending: true, nullsFirst: false })
        .order("createdAt", { ascending: true })

    if (error) {
        throw new Error(
            `Failed to fetch available contract allowances: ${error.message}`
        )
    }

    return data ?? []
}