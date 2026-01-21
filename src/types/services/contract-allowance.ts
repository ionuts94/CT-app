import { ContractAllowanceSource } from "@prisma/client";

export type T_CreateContractAllowancePayload = {
    userId: string,
    source: ContractAllowanceSource,
    expiresAt: string | null,
}

export type T_RefillContractAllowancePayload = {
    userId: string,
    source: ContractAllowanceSource,
    expiresAt: Date | null,
    allowanceCount: number,
    refillKey: string
}