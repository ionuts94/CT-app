import { createClient } from "@/lib/supabase/server"
import { T_RefillContractAllowancePayload } from "@/types/services/contract-allowance"

export async function refillContractAllowanceForUser({
    userId,
    allowanceCount,
    source,
    expiresAt,
    refillKey,
}: T_RefillContractAllowancePayload) {
    if (!userId) throw new Error("refillContractAllowanceForUser: userId missing")
    if (!allowanceCount || allowanceCount <= 0) return { inserted: 0, skipped: 0 }
    if (!expiresAt) throw new Error("refillContractAllowanceForUser: expiresAt missing")
    if (!refillKey) throw new Error("refillContractAllowanceForUser: refillKey missing")

    const supabase = await createClient()

    const rows = Array.from({ length: allowanceCount }, () => ({
        userId,
        source,
        expiresAt,
        refillKey,
        contractId: null,
        consumedAt: null,
        archivedAt: null,
    }))

    const rowsWithUniqueKeys = rows.map((r, i) => ({
        ...r,
        refillKey: `${refillKey}:${i}`,
    }))

    const { data, error } = await supabase
        .from("contract_allowance")
        .upsert(rowsWithUniqueKeys, { onConflict: "refillKey", ignoreDuplicates: true })
        .select("id")

    if (error) {
        throw new Error(
            `Failed to refill contract allowance for user '${userId}'. Error: ${error.message}`
        )
    }

    const inserted = data?.length ?? 0
    const skipped = allowanceCount - inserted

    return { inserted, skipped }
}
