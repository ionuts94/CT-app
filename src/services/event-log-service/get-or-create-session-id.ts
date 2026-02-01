"use server"

import { cookies } from "next/headers"

const SESSION_COOKIE = "pactly_session_id"

export async function getOrCreateSessionId() {
  const cookieStore = await cookies()
  let sessionId = cookieStore.get(SESSION_COOKIE)?.value

  if (!sessionId) {
    sessionId = crypto.randomUUID()
    cookieStore.set(SESSION_COOKIE, sessionId, {
      path: "/",
      sameSite: "lax",
      httpOnly: false,
    })
  }

  return sessionId
}