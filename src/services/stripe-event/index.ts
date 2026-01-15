import { createEvent } from "./create-event"
import { markFailed } from "./mark-failed"
import { markProcessed } from "./mark-processed"
import { updateEvent } from "./update-event"

const StripeEventService = {
    createEvent,
    updateEvent,
    markProcessed,
    markFailed
}

export default StripeEventService