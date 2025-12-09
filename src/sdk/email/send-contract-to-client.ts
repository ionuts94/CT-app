import { api } from "@/app/api/endpoints";
import { T_SendContractEmailBody } from "@/app/api/emails/send-contract/route";
import { CustomApiResponse } from "@/types/api-call";
import { Contract } from "@prisma/client";

export async function sendContractToClient(payload: T_SendContractEmailBody) {
  const res = await fetch(api.emails.sendContract, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const json = await res.json()

  if (!res.ok) {
    throw new Error(json.error || "Failed to create contract");
  }

  return json as CustomApiResponse<Contract>;
}