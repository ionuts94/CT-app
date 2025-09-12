"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useOnboardingContext } from "@/contexts/onboarding-context"
import { OnboardingHeader } from "./onboarding-header"

type Props = {

}

export const Onboarding: React.FC<Props> = ({ }) => {
  const { CurrentStepElement } = useOnboardingContext()

  return (
    <Card className="w-[94vw] max-w-[960px] mx-auto py-0">
      <OnboardingHeader />
      <CurrentStepElement />
    </Card >
  )
}