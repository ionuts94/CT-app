import { api } from "@/app/api/endpoints";
import { httpPost } from "../http";
import { T_FailContractBody } from "@/types/api/contracts";

export async function declineContract(payload: T_FailContractBody) {
  return httpPost(api.contracts.decline, payload)
}