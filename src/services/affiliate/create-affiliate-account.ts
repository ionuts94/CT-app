import { createClient } from "@/lib/supabase/server";
import { generateReferralCode } from "./utils";
import { AffiliateAccountStatus } from "@prisma/client";

export async function createAffiliateAccount(payload: { userId: string }) {
    const supabase = await createClient()

    const { data, error } = await supabase.from("affiliate_accounts").insert({
        userId: payload.userId,
        referralCode: generateReferralCode(),
        status: AffiliateAccountStatus.ACTIVE,
        commissionRate: 0.3
    })
        .select("*")
        .maybeSingle()

    if (error) throw new Error(error.message)
    return data
}