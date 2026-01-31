import { v4 as uuid } from "uuid"

export function getSessionId() {
  const key = "pactly_session_id"

  let sessionId = localStorage.getItem(key)

  if (!sessionId) {
    sessionId = uuid()
    localStorage.setItem(key, sessionId)
  }

  return sessionId
}