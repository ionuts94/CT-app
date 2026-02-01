import { getOrCreateSessionId } from "./get-or-create-session-id"
import { logEvent } from "./log-event"

const EventLogService = {
  logEvent,
  getOrCreateSessionId
}

export default EventLogService