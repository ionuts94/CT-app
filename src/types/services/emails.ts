import { T_ContractWithCompanyAndOwner } from "@/services/contracts/get"
import { Comment } from "@prisma/client"

export type T_ContractSignedNotificationsPayload = {
  contractId: string,
  pdfUrl: string
}

export type T_NewCommentNotificationPayload = {
  contractData: T_ContractWithCompanyAndOwner,
  commentData: Comment,
}