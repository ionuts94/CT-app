import { Company, Contract, ContractVersion, Signature, User } from "@prisma/client"

export type T_ViewContract = Contract & {
  company: Company,
  ownerSignature: Signature,
  receiverSignature: Signature,
  owner: User,
  currentVersion: ContractVersion
}

export type T_ContractWithVersion = Contract & {
  currentVersion: ContractVersion
}

export type T_ContractWithVersionAndOwner = Contract & {
  currentVersion: ContractVersion,
  owner: User
}

export type T_ReceiverSignContractPayload = {
  contractId: string,
  receiverSignatureId: string,
  receiverName: string,
}

export type T_FailContractPayload = {
  contractId: string,
  failedReason?: string
}