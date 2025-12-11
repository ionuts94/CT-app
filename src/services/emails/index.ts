import { sendContractFailedNotifications } from "./send-contract-failed-notification"
import { sendContractSignedNotifications } from "./send-contract-signed-notifications"

const EmailService = {
  sendContractSignedNotifications,
  sendContractFailedNotifications
}

export default EmailService