import { ONBOARDING_STEPS } from "@/app/onboarding/components/stepts";
import { createClient } from "@/lib/supabase/server";

export async function createUserOnboarding({ userId }: { userId: string }) {
  const supabase = await createClient();

  const { data, error } = await supabase.from("onboarding").insert({
    ...DEFAULT_ONBOARDING_RECORD,
    userId,
  })
    .select("*")
    .maybeSingle()

  if (error) {
    throw Error(error.message)
  }

  return data
}


const DEFAULT_ONBOARDING_RECORD = {
  createdAt: new Date(),
  data: {},
  stepsDone: [],
  nextUncompleteStep: ONBOARDING_STEPS[0].name,
  status: "IN_PROGRESS",
}