export type T_CreateContractPayload = {
  title: string,
  content: string,
  ownerSignatureId: string,
  receiverName: string,
  receiverEmail: string,
  optionalMessage?: string
}