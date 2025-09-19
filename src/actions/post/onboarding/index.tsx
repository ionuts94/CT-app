"use server"

import { ONBOARDING_STEPS, T_StepName } from "@/app/onboarding/components/stepts";
import { T_OnboardingData } from "@/contexts/onboarding-context";
import { createClient } from "@/lib/supabase/server";
import { CustomApiResponse, Status } from "@/types/api-call";
import { Onboarding } from "@prisma/client";

export async function CreateOnboardingForUser({
  userId
}: {
  userId: string
}): Promise<CustomApiResponse<Onboarding>> {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.from("onboarding").insert({
      ...DEFAULT_ONBOARDING_RECORD,
      userId,
    })
      .select("*")
      .maybeSingle()

    if (error) {
      throw Error(error.message)
    }

    return {
      status: Status.SUCCESS,
      data: data
    };
  } catch (err: any) {
    const errMessage = `Failed to create onboarding record. Error: ${err.message}`;
    console.log(errMessage);
    return {
      status: Status.FAILED,
      error: errMessage
    };
  }
}


export async function GetUserOnboarding({
  userId
}: {
  userId: string
}): Promise<CustomApiResponse<Onboarding>> {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.from("onboarding")
      .select("*")
      .eq("userId", userId)
      .maybeSingle()

    if (error) {
      throw Error(error.message)
    }

    if (!data) {
      const { data: fallbackData, error } = await CreateOnboardingForUser({ userId })
      if (error || !fallbackData) throw Error(error)
      return {
        status: Status.SUCCESS,
        data: fallbackData
      };
    }

    return {
      status: Status.SUCCESS,
      data: data
    };
  } catch (err: any) {
    const errMessage = `Failed to retrieve onboarding for current user. Error: ${err.message}`;
    console.log(errMessage);
    return {
      status: Status.FAILED,
      error: errMessage
    };
  }
}


export async function UpdateOnboardingState({
  onboardingId,
  stepsDone,
  nextUncompleteStep,
  data
}: {
  onboardingId: string,
  stepsDone: T_StepName[],
  nextUncompleteStep: T_StepName,
  data: T_OnboardingData
}): Promise<CustomApiResponse> {
  const supabase = await createClient();

  try {
    const { error } = await supabase.from("onboarding")
      .update({
        stepsDone,
        nextUncompleteStep,
        data,
      })
      .eq("id", onboardingId)
      .maybeSingle()

    return {
      status: Status.SUCCESS,
      data: ""
    };
  } catch (err: any) {
    const errMessage = `${err.message}`;
    console.log(errMessage);
    return {
      status: Status.FAILED,
      error: errMessage
    };
  }
}

const DEFAULT_ONBOARDING_RECORD = {
  createdAt: new Date(),
  data: {},
  stepsDone: [],
  nextUncompleteStep: ONBOARDING_STEPS[0].name,
  status: "IN_PROGRESS",
}