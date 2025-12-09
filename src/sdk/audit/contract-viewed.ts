import { httpPost } from "@/sdk/http"
import { api } from "@/app/api/endpoints"

export function logContractViewed(payload: {
  contractId: string;
  actorType: "SENDER" | "SIGNER";
}) {
  return httpPost(api.audit.contractViewed, payload);
}