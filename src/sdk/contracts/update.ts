import { httpPatch } from "@/sdk/http";
import { api } from "@/app/api/endpoints";
import { ApiResponse } from "@/sdk/http";
import { Contract } from "@prisma/client";
import { T_CreateContractPayload } from "@/validators/contract.validator";

export function updateContract(
  payload: T_CreateContractPayload
): Promise<ApiResponse<Contract>> {
  return httpPatch<Contract>(api.contracts.update, payload);
}
