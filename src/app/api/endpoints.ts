import { envs } from "@/constants/envs";

export const api = {
  contract: {
    userSign: envs.NEXT_PUBLIC_URL + "/api/contract/user-sign",
    generateContractPdf: envs.NEXT_PUBLIC_URL + "/api/contract/generate",
    onContractSigned: envs.NEXT_PUBLIC_URL + "/api/contract/on-contract-signed"
  },
  emails: {
    sendContract: envs.NEXT_PUBLIC_URL + "/api/emails/send-contract"
  },
  contracts: {
    create: envs.NEXT_PUBLIC_URL + "/api/contracts/create",
    get: {
      receiver: envs.NEXT_PUBLIC_URL + "/api/contracts/get/receiver",
      sender: envs.NEXT_PUBLIC_URL + "/api/contracts/get/sender",
    },
  }
} as const