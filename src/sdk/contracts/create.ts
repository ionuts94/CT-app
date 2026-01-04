import { httpPost } from "@/sdk/http";
import { api } from "@/app/api/endpoints";
import { ApiResponse } from "@/sdk/http";
import { Contract } from "@prisma/client";
import { T_CreateContractBody } from "@/types/api/contracts";

export function createContract(
  payload: T_CreateContractBody
): Promise<ApiResponse<Contract>> {
  return httpPost<Contract>(api.contracts.create, payload);
}
