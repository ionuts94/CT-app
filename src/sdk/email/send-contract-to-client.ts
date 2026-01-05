import { api } from "@/app/api/endpoints";
import { T_SendContractEmailBody } from "@/app/api/emails/send-contract/route";
import { httpPost } from "../http";

export async function sendContractToClient(payload: T_SendContractEmailBody) {
  return httpPost(api.emails.sendContract, payload)
}