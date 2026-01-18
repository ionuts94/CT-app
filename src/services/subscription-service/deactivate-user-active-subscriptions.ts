import { createClient } from "@/lib/supabase/server";
import { SubscriptionStatus } from "@prisma/client";

export async function deactiaveUserActiveSubscriptions({ userId }: { userId: string }) {
    const supabase = await createClient()
    const { error } = await supabase.from("subscriptions")
        .update({ status: SubscriptionStatus.CANCELED })
        .eq("userId", userId).
        eq("status", SubscriptionStatus.ACTIVE)

    if (error) throw new Error(error.message)
    return "OK"
}