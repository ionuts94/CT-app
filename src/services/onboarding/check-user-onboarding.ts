import { User } from "@supabase/supabase-js";
import OnboardingService from ".";
import { redirect } from "next/navigation";
import { envs } from "@/constants/envs";
import { FIRST_ONBOARDING_STEP } from "@/app/onboarding/components/stepts";

export async function checkUserOnboarding(user: User) {
  if (user?.user_metadata?.onboardingCompleted) return;
  const onboardingData = await OnboardingService.getUserOnboarding({ userId: user.id })
  return redirect(envs.NEXT_PUBLIC_URL + "/onboarding/" + (onboardingData?.nextUncompleteStep || FIRST_ONBOARDING_STEP.name))
}