import { createClient } from "@/lib/supabase/server"
import { LogEventInput } from "./types"

export async function logEvent({
  event,
  path,
  source,
  sessionId,
  userId = null,
}: LogEventInput) {
  const supabase = await createClient()

  const { error } = await supabase.from("event_logs").insert({
    event,
    path,
    source,
    sessionId,
    userId,
  })

  if (error) {
    // log silent – analytics should never break UX
    console.error("[logEvent]", error.message)
  }
}