import { createContract } from "./create"
import { declineContract } from "./decline-contract"
import { getReceiverContract } from "./get-receiver-contract"
import { getSenderContract } from "./get-sender-contract"
import { onContractSigned } from "./on-contract-signed"
import { receiverSignContract } from "./receiver-sign-contract"
import { revokeContract } from "./revoke"

const CTContract = {
  createContract,
  getSenderContract,
  getReceiverContract,
  receiverSignContract,
  onContractSigned,
  declineContract,
  revokeContract
}

export default CTContract