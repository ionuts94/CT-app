type T_SendContractArgs = {
  senderName: string,
  acceptInviteUrl: string
}

export const GET_SEND_CONTRACT_DATA = {

} as const


export const EMAIL_TEMPLATE_IDS = {
  "sendContract": 1,
  "newSenderCommentNotification": 5,
  "newSignerCommentNotification": 4,
  "newSystemCommentNotification": 6
}