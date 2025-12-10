export type T_GetReceiverContractBody = {
  receiverToken: string
}

export type T_GetContractCommentsBody = {
  contractId: string
}

export type T_GetContractAuditLogBody = {
  contractId: string
}

export type T_ReceiverSignContractBody = {
  contractId: string,
  signatureImageUrl: string,
  receiverName: string,
}