import { createClient } from "@/lib/supabase/server"
import ContractAllowanceService from "."
import { dateUtils } from "@/lib/date-utils"

export async function consumeContractAllowance({
    userId,
    contractId,
}: {
    userId: string
    contractId: string
}) {
    const supabase = await createClient()

    const allowanceToBeConsumed = await ContractAllowanceService.getNextContractAllowance(userId)

    if (!allowanceToBeConsumed) {
        const errMessage = "No more contract allowance for user: " + userId
        console.warn(errMessage)
        throw new Error(errMessage)
    }

    const { error } = await supabase.from("contract_allowance")
        .update({
            consumedAt: dateUtils.toUTC(new Date(), dateUtils.getUserTimeZone()).toISOString(),
            contractId,
        })
        .eq("id", allowanceToBeConsumed.id)
        .is("consumedAt", null)

    if (error) {
        if (error?.message.includes("duplicate key")) {
            // DO NOTHING
        } else {
            const errMessage = "We're encountering technical issues. Please try again in a minute."
            console.error(errMessage + "Error: " + error.message)
            throw new Error(errMessage)
        }
    }

    return "OK"
}
