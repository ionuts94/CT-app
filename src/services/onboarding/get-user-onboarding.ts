import { createClient } from "@/lib/supabase/server";
import OnboardingService from ".";
import { Onboarding } from "@prisma/client";

export async function getUserOnboarding({ userId }: { userId: string }): Promise<Onboarding> {
  const supabase = await createClient();

  const { data, error } = await supabase.from("onboarding")
    .select("*")
    .eq("userId", userId)
    .maybeSingle()

  if (error) {
    throw Error(error.message)
  }

  if (!data) {
    const { data: fallbackData, error } = await OnboardingService.createUserOnboarding({ userId })
    if (error || !fallbackData) throw Error(error)
    return fallbackData;
  }

  return data
}