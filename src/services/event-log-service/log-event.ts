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
  ip,
}: LogEventInput) {
  const supabase = await createClient()

  const [
    { data: authUser },
    ipLocationResponse
  ] = await Promise.all([
    withSafeService(() => AuthService.getAuthUser()),
    fetch(`https://ipapi.co/${ip}/json/`, {
      cache: "no-store",
    })
  ])

  // const ipLocationData = await ipLocationResponse.json()
  const ipLocationData = {
    country_code: "RO"
  }

  const { error } = await supabase.from("event_logs").insert({
    event,
    path,
    source,
    sessionId,
    userId: authUser?.id,
    ip,
    country: ipLocationData?.country_code ?? "unknown",
  })

  if (error) {
    // analytics must never break UX
    console.error("[logEvent]", error.message)
  }
}
