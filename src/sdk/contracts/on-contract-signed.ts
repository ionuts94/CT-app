import { httpPost } from "../http";
import { api } from "@/app/api/endpoints";

export async function onContractSigned(payload: { contractId: string }) {
  return httpPost(api.contracts.onContractSigned, payload)
}