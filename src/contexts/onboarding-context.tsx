// contexts/onboarding-context.tsx
"use client"
import { ONBOARDING_STEPS, T_StepItem, T_StepName } from "@/app/onboarding/components/stepts"
import { useRouter } from "next/navigation"
import React, { createContext, useContext, useMemo, useState } from "react"


type Ctx = {
  current: T_StepName
  completedSteps: T_StepName[],
  steps: typeof ONBOARDING_STEPS
  index: number
  progress: number
  goTo: (s: T_StepName) => void
  next: () => Promise<void> | void
  back: () => void,
  isCurrentStep: (step: T_StepItem) => boolean,
  isStepCompleted: (step: T_StepItem) => boolean
}
const OnboardingCtx = createContext<Ctx>({} as any)

async function validateBeforeNext(name: T_StepName) {
  // switch(name){ case "company": await form.trigger(); ... }
  return true
}

type Props = { initialStep: T_StepName; children?: React.ReactNode }

export function OnboardingProvider({ initialStep, children }: Props) {
  const router = useRouter()
  const [current, setCurrent] = useState<T_StepName>(initialStep)
  const [completedSteps, setCompletedSteps] = useState<T_StepName[]>([])

  const index = ONBOARDING_STEPS.findIndex(s => s.name === current)

  const progress = (index + 1) / ONBOARDING_STEPS.length

  const goTo = (s: T_StepName) => {
    if (!ONBOARDING_STEPS.some(st => st.name === s)) return
    setCurrent(s)
    router.push(`/onboarding/${s}`)
  }

  const next = async () => {
    const ok = await validateBeforeNext(current)
    if (!ok) return

    setCompletedSteps(prev => Array.from(new Set([...prev, current])))

    if (index < ONBOARDING_STEPS.length - 1) {
      const nextStep = ONBOARDING_STEPS[index + 1].name
      goTo(nextStep)
    }
  }

  const back = () => {
    if (index > 0) goTo(ONBOARDING_STEPS[index - 1].name)
  }

  const isCurrentStep = (step: T_StepItem) => step.name === current
  const isStepCompleted = (step: T_StepItem) => completedSteps.includes(step.name)

  return (
    <OnboardingCtx.Provider
      value={{
        current,
        completedSteps,
        steps: ONBOARDING_STEPS,
        index,
        progress,
        goTo,
        next,
        back,
        isCurrentStep,
        isStepCompleted,
      }}>
      {children}
    </OnboardingCtx.Provider>
  )
}

export const useOnboardingContext = () => useContext(OnboardingCtx)
