import { createContract } from "./create"
// export * from "./send"
// export * from "./view"
// export * from "./comment"
// export * from "./sign"
// export * from "./decline"
// export * from "./revoke"
// export * from "./list"
import { getContractWithCompanyAndOwner } from "./get"
import { createContractVersion } from "./versions"
import { logAudit } from "./log-audit"
import { getReceiverContract } from "./get-receiver-contract"
import { getSenderContract } from "./get-sender-contract"

const ContractService = {
  createContract,
  createContractVersion,
  getContractWithCompanyAndOwner,
  getSenderContract,
  getReceiverContract,
  logAudit,
}

export default ContractService