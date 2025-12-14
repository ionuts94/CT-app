import ContractService from "../contracts";
import CommentService from "../comments";
import EmailService from ".";

export async function sendContractNewCommentNotification({ contractId, commentId }: { contractId: string, commentId: string }) {
  const [
    contractData,
    commentData
  ] = await Promise.all([
    ContractService.getContractWithCompanyAndOwner({ contractId }),
    CommentService.getContractComment({ commentId })
  ])

  switch (commentData?.partyRole) {
    case "SENDER":
      await EmailService.sendSignerNewCommentNotification({ contractData, commentData })
      break;
    case "SIGNER":
      EmailService.sendSenderNewCommentNotification({ contractData, commentData })
      break;
    case "SYSTEM":
      await Promise.all([
        EmailService.sendSignerNewCommentNotification({ contractData, commentData }),
        EmailService.sendSenderNewCommentNotification({ contractData, commentData })
      ])
    default:
      await Promise.all([
        EmailService.sendSignerNewCommentNotification({ contractData, commentData }),
        EmailService.sendSenderNewCommentNotification({ contractData, commentData })
      ])
  }
}