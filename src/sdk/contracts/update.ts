import { httpPatch } from "@/sdk/http";
import { api } from "@/app/api/endpoints";
import { ApiResponse } from "@/sdk/http";
import { Contract } from "@prisma/client";
import { T_UpdateContractBody } from "@/types/api/contracts";

export function updateContract(
  payload: T_UpdateContractBody
): Promise<ApiResponse<Contract>> {
  return httpPatch<Contract>(api.contracts.update, payload);
}
