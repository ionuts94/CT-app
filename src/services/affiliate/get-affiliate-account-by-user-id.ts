import { createClient } from "@/lib/supabase/server";
import { AffiliateAccount } from "@prisma/client";

export async function getAffiliateAccountByUserId({ userId }: { userId: string }): Promise<AffiliateAccount> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("affiliate_accounts")
    .select("*")
    .eq("userId", userId)
    .maybeSingle()

  if (error) {
    console.log(`Failed to retrieve affiliate account for user '${userId}'. Error: ${error.message}`)
    throw new Error(error.message)
  }

  return data
}