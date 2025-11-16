import { envs } from "@/constants/envs";

export const api = {
  contract: {
    userSign: envs.NEXT_PUBLIC_URL + "/api/contract/user-sign",
    generateContractPdf: envs.NEXT_PUBLIC_URL + "/api/contract/generate",
    onContractSigned: envs.NEXT_PUBLIC_URL + "/api/contract/on-contract-signed"
  }
} as const