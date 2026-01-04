import { T_ContractPayload } from "@/validators/contract.validator"
import { Contract } from "@prisma/client"

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

export type T_FailContractBody = {
  contractId: string,
  failedReason?: string
}

export type T_CreateContractBody = T_ContractPayload & {}

export type T_UpdateContractBody = T_ContractPayload & {
  contractId: string,
  content: string
}