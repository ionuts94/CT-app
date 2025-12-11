import { httpPost } from "../http";
import { api } from "@/app/api/endpoints";
import { T_FailContractPayload } from "@/types/services/contracts";

export async function revokeContract(payload: T_FailContractPayload) {
  return httpPost(api.contracts.revoke, payload);
}