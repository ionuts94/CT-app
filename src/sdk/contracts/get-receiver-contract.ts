import { api } from "@/app/api/endpoints";
import { httpPost } from "../http";
import { T_GetReceiverContractBody } from "@/types/api/contracts";

export async function getReceiverContract(payload: T_GetReceiverContractBody) {
  return httpPost(api.contracts.get.receiver, payload)
}