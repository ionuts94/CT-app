import { BrandingStep } from "@/app/(onboarding)/onboarding/components/branding-step"
import { CompanyStep } from "@/app/(onboarding)/onboarding/components/company-step"
import { SignatureStep } from "@/app/(onboarding)/onboarding/components/signature-step"
import { createContext, useContext, useState } from "react"

const OnboardingCtx = createContext<{
  currentStep: undefined | T_SteptItem,
  stepsCompleted: T_StepCompleted[]
}>({
  currentStep: undefined,
  stepsCompleted: [],
})

type Props = {
  children: React.ReactNode
}

export const OnboardingContext: React.FC<Props> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<undefined | T_SteptItem>(STEPS[0])
  const [stepsCompleted, setStepsCompleted] = useState<T_StepCompleted[]>([])

  return (
    <OnboardingCtx.Provider value={{ currentStep, stepsCompleted }}>
      {children}
    </OnboardingCtx.Provider>
  )
}

export const useOnboardingContext = () => {
  const ctx = useContext(OnboardingCtx)
  return ctx
}

const STEPS = [
  {
    name: "company",
    component: CompanyStep,
  },
  {
    name: "branding",
    component: BrandingStep
  },
  {
    name: "signature",
    component: SignatureStep
  },
  {
    name: "done",
    component: SignatureStep
  }
] as const

type T_SteptItem = typeof STEPS[number]
type T_StepCompleted = typeof STEPS[number]["name"]