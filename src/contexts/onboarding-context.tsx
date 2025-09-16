"use client"

import { ONBOARDING_STEPS, T_StepItem, T_StepName } from "@/app/onboarding/components/stepts"
import { T_BrandingOnboardingSchema, T_CompanyOnboardingSchema, T_SignatureOnboardingSchema } from "@/validators/onboarding.validator"
import { Onboarding } from "@prisma/client"
import { useRouter } from "next/navigation"
import React, { createContext, useContext, useState } from "react"


type Ctx = {
  currentStep: T_StepName,
  completedSteps: T_StepName[],
  steps: typeof ONBOARDING_STEPS,
  index: number,
  progress: number,
  onboardingData: T_OnboardingData,
  onboarding: Onboarding,
  goTo: (s: T_StepName) => void
  next: () => Promise<void> | void
  back: () => void,
  isCurrentStep: (step: T_StepItem) => boolean,
  isStepCompleted: (step: T_StepItem) => boolean,
  findNextStep: () => T_StepName | undefined,
  setOnboardingData: React.Dispatch<React.SetStateAction<T_OnboardingData>>,
  setOnboardingCompany: (companyData: T_CompanyOnboardingSchema) => void,
  setOnboardingBranding: (brandingData: T_BrandingOnboardingSchema) => void,
  setOnboardingSignature: (signatureData: T_SignatureOnboardingSchema) => void
}
const OnboardingCtx = createContext<Ctx>({} as any)

async function validateBeforeNext(name: T_StepName) {
  // switch(name){ case "company": await form.trigger(); ... }
  return true
}

export type T_OnboardingData = {
  company: T_CompanyOnboardingSchema,
  branding: T_BrandingOnboardingSchema,
  signature: T_SignatureOnboardingSchema
}

type Props = {
  children?: React.ReactNode,
  data: Onboarding
}

export function OnboardingProvider({ children, data }: Props) {
  console.log(data)
  const router = useRouter()
  const [onboarding, setOnboarding] = useState(data || {})
  const [currentStep, setCurrentStep] = useState<T_StepName>((data?.currentStep as T_StepName) || ONBOARDING_STEPS[0].name)
  const [completedSteps, setCompletedSteps] = useState<T_StepName[]>((data?.stepsDone as T_StepName[]) || [])
  const [onboardingData, setOnboardingData] = useState<T_OnboardingData>((data.data || {}) as T_OnboardingData)

  const index = ONBOARDING_STEPS.findIndex(s => s.name === currentStep)
  const progress = (index + 1) / ONBOARDING_STEPS.length

  const isCurrentStep = (step: T_StepItem) => step.name === currentStep
  const isStepCompleted = (step: T_StepItem) => completedSteps.includes(step.name)
  const findNextStep = () => index < ONBOARDING_STEPS.length - 1 ? ONBOARDING_STEPS[index + 1].name : undefined

  const setOnboardingCompany = (companyData: T_CompanyOnboardingSchema) => {
    setOnboardingData(prev => ({ ...prev, company: companyData }))
  }

  const setOnboardingBranding = (brandingData: T_BrandingOnboardingSchema) => {
    setOnboardingData(prev => ({ ...prev, branding: brandingData }))
  }

  const setOnboardingSignature = (signatureData: T_SignatureOnboardingSchema) => {
    setOnboardingData(prev => ({ ...prev, signature: signatureData }))
  }

  const goTo = (s: T_StepName) => {
    if (!ONBOARDING_STEPS.some(st => st.name === s)) return
    setCurrentStep(s)
    router.push(`/onboarding/${s}`)
  }

  const back = () => {
    if (index > 0) goTo(ONBOARDING_STEPS[index - 1].name)
  }

  const next = async () => {
    const ok = await validateBeforeNext(currentStep)
    if (!ok) return

    setCompletedSteps(prev => Array.from(new Set([...prev, currentStep])))
    const nextStep = findNextStep()
    if (nextStep) goTo(nextStep)
  }

  return (
    <OnboardingCtx.Provider
      value={{
        currentStep,
        completedSteps,
        steps: ONBOARDING_STEPS,
        index,
        progress,
        onboardingData,
        onboarding,
        goTo,
        next,
        back,
        isCurrentStep,
        isStepCompleted,
        findNextStep,
        setOnboardingData,
        setOnboardingCompany,
        setOnboardingBranding,
        setOnboardingSignature
      }}>
      {children}
    </OnboardingCtx.Provider>
  )
}

export const useOnboardingContext = () => useContext(OnboardingCtx)
