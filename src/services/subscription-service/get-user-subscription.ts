import { createClient } from "@/lib/supabase/server";
import { Subscription, SubscriptionStatus } from "@prisma/client";

export async function getUserSubscription({ userId }: { userId: string }): Promise<Subscription> {
  const supabase = await createClient()
  const { data, error } = await supabase.from("subscriptions")
    .select("*")
    .eq("userId", userId)
    .eq("status", SubscriptionStatus.ACTIVE)
    .order("currentPeriodEnd", { ascending: false })
    .limit(1)

  if (error) {
    console.log("Failed to get user subscription. Error: " + error.message)
    throw new Error("Failed to get user subscription. Please try again in a few minutes.")
  }

  return data[0]
}