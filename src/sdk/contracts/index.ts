import { createContract } from "./create"
import { getReceiverContract } from "./get-receiver-contract"
import { getSenderContract } from "./get-sender-contract"
import { onContractSigned } from "./on-contract-signed"
import { receiverSignContract } from "./receiver-sign-contract"

const CTContract = {
  createContract,
  getSenderContract,
  getReceiverContract,
  receiverSignContract,
  onContractSigned,
}

export default CTContract