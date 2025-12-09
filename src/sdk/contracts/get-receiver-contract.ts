import { T_CreateContractPayload } from "@/app/api/contracts/types";
import { api } from "@/app/api/endpoints";
import { CustomApiResponse } from "@/types/api-call";
import { Contract } from "@prisma/client";

export async function getReceiverContract(payload: T_CreateContractPayload) {
  const res = await fetch(api.contracts.create, {
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