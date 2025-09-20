"use server"

import { GetAuthUser } from "@/actions/get/auth";
import { ONBOARDING_STEPS, T_StepName } from "@/app/onboarding/components/stepts";
import { T_OnboardingData } from "@/contexts/onboarding-context";
import { createClient } from "@/lib/supabase/server";
import { CustomApiResponse, Status } from "@/types/api-call";
import { Onboarding } from "@prisma/client";
import { CreateCompany } from "../company";
import { CreateSignature } from "../signature";

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


export async function CompleteOnboarding(): Promise<CustomApiResponse> {
  const supabase = await createClient()

  try {
    const { data: authUser, error: authError } = await GetAuthUser()

    if (authError || !authUser) throw authError

    await supabase.auth.updateUser({
      data: {
        onboardingCompleted: true
      }
    })

    const { data: onboardingRecord, error: onboardingDataError } = await GetUserOnboarding({ userId: authUser?.id! })

    if (onboardingDataError) throw Error(onboardingDataError)

    const onboardingData = onboardingRecord?.data as T_OnboardingData

    const { error } = await CreateCompany({
      companyCui: onboardingData.company.companyCui,
      companyName: onboardingData.company.companyName,
      companyRegNumber: onboardingData.company.companyRegNumber,
      compnayEmailDomain: onboardingData.company.compnayEmailDomain,
      logoUrl: onboardingData.branding.logoUrl,
      primaryColor: onboardingData.branding.primaryColor,
      secondaryColor: onboardingData.branding.secondaryColor,
      accentColor: onboardingData.branding.accentColor,
    })

    if (onboardingData.signature.url) {
      const { error } = await CreateSignature({
        userId: authUser.id!,
        imageUrl: onboardingData.signature.url,
      })
      if (error) throw Error(error)
    }

    await supabase.from("onboarding").update({ status: "COMPLETED" }).eq("id", onboardingRecord?.id)

    return {
      status: Status.SUCCESS,
      data: "done"
    };
  } catch (err: any) {
    const errMessage = `Failed to complete onboarding: Error: ${err.message}`;
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