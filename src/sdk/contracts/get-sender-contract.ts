import { api } from "@/app/api/endpoints";
import { CustomApiResponse } from "@/types/api-call";
import { Contract } from "@prisma/client";
import { httpGet } from "../http";

export async function getSenderContract() {
  return httpGet(api.contracts.get.sender, {})
}