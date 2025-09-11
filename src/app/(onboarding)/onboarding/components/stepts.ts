import { BrandingStep } from "./branding-step"
import { CompanyStep } from "./company-step"
import { DoneStep } from "./done-step"
import { SignatureStep } from "./signature-step"

export const ONBOARDING_STEPS = [
  { name: "company", title: "Company", Component: CompanyStep, canSkip: false },
  { name: "branding", title: "Branding", Component: BrandingStep, canSkip: true },
  { name: "signature", title: "Signature", Component: SignatureStep, canSkip: false },
  { name: "done", title: "Done", Component: DoneStep, canSkip: false },
] as const

export type T_StepItem = typeof ONBOARDING_STEPS[number]
export type T_StepName = typeof ONBOARDING_STEPS[number]["name"]