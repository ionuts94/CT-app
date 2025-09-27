import { envs } from "@/constants/envs";

export const api = {
  contract: {
    userSign: envs.NEXT_PUBLIC_URL + "/api/contract/user-sign"
  }
} as const