import { Contract, ContractVersion } from "@prisma/client";

export type ContractWithContent = Contract & {
  currentVersionContent: ContractVersion
}