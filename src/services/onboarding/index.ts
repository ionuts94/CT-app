import { completeOnboarding } from "./complete-onboarding"
import { createUserOnboarding } from "./create-user-onboarding"
import { getUserOnboarding } from "./get-user-onboarding"
import { updateOnboardingState } from "./update-onboarding-state"

const OnboardingService = {
  createUserOnboarding,
  getUserOnboarding,
  updateOnboardingState,
  completeOnboarding
}

export default OnboardingService