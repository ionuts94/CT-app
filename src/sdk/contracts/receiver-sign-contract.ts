import { httpPost } from "../http";
import { api } from "@/app/api/endpoints";
import { T_ReceiverSignContractBody } from "@/types/api/contracts";

export async function receiverSignContract(payload: T_ReceiverSignContractBody) {
  return httpPost(api.contracts.sign, payload)
}