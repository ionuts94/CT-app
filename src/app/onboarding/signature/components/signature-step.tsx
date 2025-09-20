"use client"

import { ButtonWithLoading } from "@/components/button-with-loading"
import { FormRow, Label } from "@/components/form-elements"
import { H2 } from "@/components/topography"
import { TextCTA } from "@/components/topography/cta"
import { useOnboardingContext } from "@/contexts/onboarding-context"
import { SignatureOnboarding, T_SignatureOnboardingSchema } from "@/validators/onboarding.validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Text } from "@/components/topography"
import { ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import SignaturePad from "./signature-pad"
import { UpdateOnboardingState } from "@/actions/post/onboarding"
import { LAST_ONBOARDING_STEP } from "../../components/stepts"
import { SupabaseStoreFile } from "@/actions/post/storage"
import { base64ToFile } from "@/lib/utils"
import { v4 as uuid } from "uuid"
import { BUCKETS } from "@/constants/buckets"
import { useRouter } from "next/navigation"

type Props = {

}

export const SignatureStep: React.FC<Props> = ({ }) => {
  const {
    onboardingData,
    onboarding,
    currentStepView,
    completedSteps,
    next,
    findNextStep,
    setOnboardingSignature
  } = useOnboardingContext()

  const form = useForm<T_SignatureOnboardingSchema>({
    resolver: zodResolver(SignatureOnboarding),
    defaultValues: {
      svg: "",
      png: "",
      url: ""
    }
  })

  const { handleSubmit, formState } = form

  const handleFormSubmit = async (values: T_SignatureOnboardingSchema) => {
    if (values.png) {
      const file = await base64ToFile(values.png, "signature" + uuid())
      const { data } = await SupabaseStoreFile({
        bucket: BUCKETS.signatures,
        file,
        filePath: file.name,
      })

      form.setValue("url", data?.fileUrl!)
      setOnboardingSignature({ ...values, url: data?.fileUrl! })

      const { error } = await UpdateOnboardingState({
        nextUncompleteStep: findNextStep() || LAST_ONBOARDING_STEP.name,
        data: {
          ...onboardingData,
          signature: {
            ...values,
            url: data?.fileUrl!
          }
        },
        onboardingId: onboarding.id,
        stepsDone: [...completedSteps, currentStepView]
      })
    }

    next()
  }

  const onSigatureChange = ({ svg, png }: { svg: string, png: string }) => {
    form.setValue("svg", svg)
    form.setValue("png", png)
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-full max-w-[800px] mx-auto py-[20px] space-y-[30px] px-4"
    >
      <H2>Configurați-vă semnătura</H2>
      <Text
        className="text-color-secondary"
        weight="semibold"
      >
        Selectați modul în care doriți să apară semnătura dvs. pe contracte. Ulterior, puteți modifica această opțiune din setări
        <ArrowRight className=" inline-flex mx-1" size={14} />
        semnătură.
      </Text>

      <FormRow>
        <Label>Semnătura</Label>
        <Card className="p-4">
          <SignaturePad
            onChange={onSigatureChange}
            onChangeMode="trimmed"
            onChangeDebounceMs={150}
          />
        </Card>
      </FormRow>

      <div className="flex justify-end">
        <ButtonWithLoading loading={formState.isSubmitting} className="py-4 px-10">
          <TextCTA>
            Urmatorul
          </TextCTA>
        </ButtonWithLoading>
      </div>
    </form>
  )
}