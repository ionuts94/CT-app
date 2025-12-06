import { CustomApiResponse, Status } from "@/types/api-call";
import { T_CreateContractPayload } from "./types";
import { Contract } from "@prisma/client";
import { api } from "../endpoints";

export const ContractService = {
  create: async (payload: T_CreateContractPayload): Promise<CustomApiResponse<Contract>> => {
    const response = await fetch(api.contracts.create, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    })

    const json = await response.json() as CustomApiResponse<Contract>
    return json
  }
}