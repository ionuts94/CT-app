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
import { getReceiverContract } from "./get-receiver-contract"
import { getSenderContract } from "./get-sender-contract"
import { receiverSignContract } from "./sign"
import { generatePdf } from "./generate-pdf"
import { updateContractPdfUrl } from "./update"
import { declineContract } from "./decline"
import { revokeContract } from "./revoke"
import { getAuthUserContracts } from "./get-auth-user-contracts"

const ContractService = {
  createContract,
  createContractVersion,
  getContractWithCompanyAndOwner,
  getSenderContract,
  getReceiverContract,
  receiverSignContract,
  generatePdf,
  updateContractPdfUrl,
  declineContract,
  revokeContract,
  getAuthUserContracts
}

export default ContractService