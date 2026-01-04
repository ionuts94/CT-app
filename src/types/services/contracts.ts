import { Company, Contract, ContractStatus, ContractVersion, Signature, User } from "@prisma/client"

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

export type ContractDBInsertPayload = {
  id: string;
  title: string;
  ownerId: string;
  companyId?: string | null;
  createdAt: Date;
  updatedAt: Date;
  expiresAt?: string | null;
  signingDeadline?: string | null;
  status: ContractStatus,
  ownerSignatureId: string;
  receiverName: string;
  receiverEmail: string;
  optionalMessage?: string | null;
  currentVersionId: string;
};