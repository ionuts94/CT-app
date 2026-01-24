import { createClient } from "@/lib/supabase/server"
import AuthService from "../auth"
import OnboardingService from "."
import { T_OnboardingData } from "@/contexts/onboarding-context"
import CompanyService from "../companies"
import SignatureService from "../signatures"
import ContractAllowanceService from "../contract-allowance"

export async function completeOnboarding() {
  const supabase = await createClient()

  const authUser = await AuthService.getAuthUser()

  await supabase.auth.updateUser({
    data: {
      onboardingCompleted: true
    }
  })

  const onboardingRecord = await OnboardingService.getUserOnboarding({
    userId: authUser.id
  })

  const onboardingData = onboardingRecord?.data as T_OnboardingData

  const companyData = await CompanyService.createCompany({
    companyCui: onboardingData.company.companyCui,
    companyName: onboardingData.company.companyName,
    companyRegNumber: onboardingData.company.companyRegNumber,
    compnayEmailDomain: onboardingData.company.compnayEmailDomain,
    logoUrl: onboardingData.branding.logoUrl,
    primaryColor: onboardingData.branding.primaryColor,
    secondaryColor: onboardingData.branding.secondaryColor,
    accentColor: onboardingData.branding.accentColor,
  })

  await SignatureService.create({
    userId: authUser.id,
    imageUrl: onboardingData.signature.url,
    type: "DRAW",
    isMainSignature: true
  })

  await supabase.from("onboarding").update({ status: "COMPLETED" }).eq("id", onboardingRecord?.id)
  await supabase.from("users").update({ currentCompanyId: companyData?.id! }).eq("id", authUser.id)

  await ContractAllowanceService.refillContractAllowanceForUser({
    userId: authUser.id,
    allowanceCount: 3,
    expiresAt: null,
    source: "TRIAL",
    refillKey: authUser.id
  })

  return "OK"
}