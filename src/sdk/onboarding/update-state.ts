import { T_UpdateOnboardingStateBody } from "@/types/api/onboarding";
import { httpPost } from "../http";
import { api } from "@/app/api/endpoints";

export async function updateState(payload: T_UpdateOnboardingStateBody) {
  return httpPost(api.onboarding.updateState, payload)
}