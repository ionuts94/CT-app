"use client"

import { Button } from "@/components/ui/button"
import { useOnboardingContext } from "@/contexts/onboarding-context"

type Props = {

}

export const Onboarding: React.FC<Props> = ({ }) => {
  const { CurrentStepElement, next } = useOnboardingContext()

  return (
    <div>
      <CurrentStepElement />
      <Button onClick={next}>Urmatorul</Button>
    </div>
  )
}