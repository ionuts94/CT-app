import { sendContractFailedNotifications } from "./send-contract-failed-notification"
import { sendContractNewCommentNotification } from "./send-contract-new-comment-notification"
import { sendContractSignedNotifications } from "./send-contract-signed-notifications"
import { sendSenderNewCommentNotification } from "./send-sender-new-comment-notification"
import { sendSignerNewCommentNotification } from "./send-signer-new-comment-notification"

const EmailService = {
  sendContractSignedNotifications,
  sendContractFailedNotifications,
  sendContractNewCommentNotification,
  sendSenderNewCommentNotification,
  sendSignerNewCommentNotification,
}

export default EmailService