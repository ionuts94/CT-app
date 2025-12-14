import { createClient } from "@/lib/supabase/server";
import { T_UpdateOnboardingStatePayload } from "@/types/services/onboarding";

export async function updateOnboardingState({
  onboardingId,
  stepsDone,
  nextUncompleteStep,
  data
}: T_UpdateOnboardingStatePayload) {
  const supabase = await createClient();

  const { error } = await supabase.from("onboarding")
    .update({
      stepsDone,
      nextUncompleteStep,
      data,
    })
    .eq("id", onboardingId)
    .maybeSingle()

  if (error) throw new Error(error.message)
}