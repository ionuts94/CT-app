import { createClient } from "@/lib/supabase/server";
import { T_CreateCompanyPayload } from "@/types/services/companies";
import { Company } from "@prisma/client";

export async function createCompany({
  companyName,
  companyCui,
  companyRegNumber,
  companyEmailDomanin,
  logoUrl,
  primaryColor,
  secondaryColor,
  accentColor,
}: T_CreateCompanyPayload): Promise<Company> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("companies").insert({
    name: companyName,
    cui: companyCui,
    regNumber: companyRegNumber,
    emailDomain: companyEmailDomanin,
    logoUrl,
    colorPrimary: primaryColor,
    colorSecondary: secondaryColor,
    colorAccent: accentColor
  })
    .select("*")
    .maybeSingle()

  if (error) throw Error(error.message)
  return data


}