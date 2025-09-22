"use server"

import { createClient } from "@/lib/supabase/server";
import { CustomApiResponse, Status } from "@/types/api-call";
import { T_BrandingOnboardingSchema, T_CompanyOnboardingSchema } from "@/validators/onboarding.validator";
import { UpdateCompanyIdForAuthUser } from "../user";
import { GetAuthUser } from "../auth";

type T_CreateCompanyArgs = T_CompanyOnboardingSchema & T_BrandingOnboardingSchema

export async function CreateCompany({
  companyName,
  companyCui,
  companyRegNumber,
  compnayEmailDomain,
  logoUrl,
  primaryColor,
  secondaryColor,
  accentColor,
}: T_CreateCompanyArgs): Promise<CustomApiResponse> {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase.from("companies").insert({
      name: companyName,
      cui: companyCui,
      regNumber: companyRegNumber,
      emailDomain: compnayEmailDomain,
      logoUrl,
      colorPrimary: primaryColor,
      colorSecondary: secondaryColor,
      colorAccent: accentColor
    })
      .select("*")
      .maybeSingle()

    if (error) throw Error(error.message)

    return {
      status: Status.SUCCESS,
      data: ""
    };
  } catch (err: any) {
    const errMessage = `Cannot create company. Error: ${err.message}`;
    console.log(errMessage);
    return {
      status: Status.FAILED,
      error: errMessage
    };
  }
}


export async function GetCompanyById({
  companyId
}: {
  companyId: string
}): Promise<CustomApiResponse> {
  const supabase = await createClient();

  try {
    const { data: authUser, error: authUserError } = await GetAuthUser()
    if (authUserError || !authUser) throw Error(authUserError || "You are not authorized to perform this action")

    const { } = await supabase.from("companies").select("*").eq("id", companyId)

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