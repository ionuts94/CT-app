import { httpPost } from "@/sdk/http";
import { T_CreateContractPayload } from "@/app/api/contracts/types";
import { api } from "@/app/api/endpoints";
import { ApiResponse } from "@/sdk/http";
import { Contract } from "@prisma/client";

export function createContract(
  payload: T_CreateContractPayload
): Promise<ApiResponse<Contract>> {
  return httpPost<Contract>(api.contracts.create, payload);
}
