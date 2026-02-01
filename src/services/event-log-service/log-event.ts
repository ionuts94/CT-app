"use server"

import { createClient } from "@/lib/supabase/server"
import { LogEventInput } from "./types"
import AuthService from "../auth"
import { withSafeService } from "@/lib/services-utils/with-safe-service"

export async function logEvent({
  event,
  path,
  source,
  sessionId,
}: LogEventInput) {
  const supabase = await createClient()
  const { data: authUser } = await withSafeService(() => AuthService.getAuthUser())

  const { error } = await supabase.from("event_logs").insert({
    event,
    path,
    source,
    sessionId,
    userId: authUser?.id,
  })

  if (error) {
    // analytics must never break UX
    console.error("[logEvent]", error.message)
  }
}
