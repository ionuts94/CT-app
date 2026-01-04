import { createContract } from "./create"
import { getContractWithCompanyAndOwner } from "./get"
import { createContractVersion } from "./versions"
import { getReceiverContract } from "./get-receiver-contract"
import { getSenderContract } from "./get-sender-contract"
import { receiverSignContract } from "./sign"
import { generatePdf } from "./generate-pdf"
import { updateContractPdfUrl } from "./update-contract-pdf-url"
import { declineContract } from "./decline"
import { revokeContract } from "./revoke"
import { getAuthUserContracts } from "./get-auth-user-contracts"
import { updateContract } from "./update"
import { hashContent } from "./hash-content"
import { hasContentChanged } from "./has-content-changed"

const ContractService = {
  createContract,
  updateContract,
  createContractVersion,
  getContractWithCompanyAndOwner,
  getSenderContract,
  getReceiverContract,
  receiverSignContract,
  generatePdf,
  updateContractPdfUrl,
  declineContract,
  revokeContract,
  getAuthUserContracts,
  hashContent,
  hasContentChanged,
}

export default ContractService