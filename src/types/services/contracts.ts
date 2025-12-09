import { Company, Contract, ContractVersion, Signature, User } from "@prisma/client"

export type T_ViewContract = Contract & {
  company: Company,
  ownerSignature: Signature,
  reciverSignature: Signature,
  owner: User,
  currentVersion: ContractVersion
}