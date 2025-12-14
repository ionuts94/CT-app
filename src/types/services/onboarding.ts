import { T_StepName } from "@/app/onboarding/components/stepts"
import { T_OnboardingData } from "@/contexts/onboarding-context"

export type T_UpdateOnboardingStatePayload = {
  onboardingId: string,
  stepsDone: T_StepName[],
  nextUncompleteStep: T_StepName,
  data: T_OnboardingData
}