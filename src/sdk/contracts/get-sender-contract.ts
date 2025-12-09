import { T_CreateContractPayload } from "@/app/api/contracts/types";
import { api } from "@/app/api/endpoints";
import { CustomApiResponse } from "@/types/api-call";
import { Contract } from "@prisma/client";
import { httpGet } from "../http";

export async function getSenderContract(payload: T_CreateContractPayload) {
  return httpGet(api.contracts.get.sender, payload)
}