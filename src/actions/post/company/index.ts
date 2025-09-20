"use server"

import { createClient } from "@/lib/supabase/server";
import { CustomApiResponse, Status } from "@/types/api-call";
import { T_BrandingOnboardingSchema, T_CompanyOnboardingSchema } from "@/validators/onboarding.validator";
import { UpdateCompanyIdForAuthUser } from "../user";

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