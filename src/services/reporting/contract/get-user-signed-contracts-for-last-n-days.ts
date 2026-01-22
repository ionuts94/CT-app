import { dateUtils } from "@/lib/date-utils"
import { createClient } from "@/lib/supabase/server"

export async function getUserSignedContractsForLastNDays({
  userId,
  days
}: {
  userId: string
  days: number
}) {
  const supabase = await createClient()

  const fromDate = dateUtils.getDateWithDayOffset(-days).toISOString()

  const { count, error } = await supabase
    .from("contracts")
    .select(
      "id",
      { count: "exact" }
    )
    .eq("ownerId", userId)
    .gte("signedAt", fromDate)

  if (error) {
    console.error("Failed to get sent contracts KPI", error)
    throw new Error("We can't get requested data at the moment.")
  }

  return { count }
}
