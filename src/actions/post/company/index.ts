"use server"

import { createClient } from "@/lib/supabase/server";
import { CustomApiResponse, Status } from "@/types/api-call";
import { T_CompanyOnboardingSchema } from "@/validators/onboarding.validator";
import { UpdateCompanyIdForAuthUser } from "../user";

type T_CreateCompanyArgs = T_CompanyOnboardingSchema & { isCallingFromOnboarding?: boolean }

export async function CreateCompany({
  companyName,
  companyCui,
  companyRegNumber,
  compnayEmailDomain,
  isCallingFromOnboarding
}: T_CreateCompanyArgs): Promise<CustomApiResponse> {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.from("companies").insert({
      name: companyName,
      cui: companyCui,
      regNumber: companyRegNumber,
      emailDomain: compnayEmailDomain
    })
      .select("*")
      .maybeSingle()

    if (error) throw Error(error.message)

    if (isCallingFromOnboarding) {
      const { error } = await UpdateCompanyIdForAuthUser({ companyId: data.id })
      if (error) {
        await supabase.from("companies").delete().eq("id", data.id).maybeSingle()
        throw Error(error)
      }
    }

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