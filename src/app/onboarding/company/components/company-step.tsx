"use client"

import { UpdateOnboardingState } from "@/actions/post/onboarding"
import { ButtonWithLoading } from "@/components/button-with-loading"
import { FormRow, Input, InvalidInputError, Label, RequiredFieldMark } from "@/components/form-elements"
import { H2 } from "@/components/topography"
import { TextCTA } from "@/components/topography/cta"
import { useOnboardingContext } from "@/contexts/onboarding-context"

import { CompanyOnboarding, T_CompanyOnboardingSchema } from "@/validators/onboarding.validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { LAST_ONBOARDING_STEP } from "../../components/stepts"
import CTOnboarding from "@/sdk/onboarding"

type Props = {
}

export const CompanyStep: React.FC<Props> = ({ }) => {
  const {
    onboardingData,
    currentStepView,
    completedSteps,
    onboarding,
    next,
    findNextStep,
    setOnboardingCompany,
  } = useOnboardingContext()

  const form = useForm<T_CompanyOnboardingSchema>({
    resolver: zodResolver(CompanyOnboarding),
    defaultValues: {
      companyName: onboardingData?.company?.companyName || "",
      companyCui: onboardingData?.company?.companyCui || "",
      companyRegNumber: onboardingData?.company?.companyRegNumber || "",
      compnayEmailDomain: onboardingData?.company?.compnayEmailDomain || ""
    }
  })

  const { register, handleSubmit, formState } = form
  const { isSubmitting, errors } = formState

  const handleFormSubmit = async (values: T_CompanyOnboardingSchema) => {
    // const { error } = await UpdateOnboardingState({
    //   onboardingId: onboarding.id,
    //   nextUncompleteStep: findNextStep() || LAST_ONBOARDING_STEP.name,
    //   stepsDone: [...completedSteps, currentStepView],
    //   data: {
    //     ...onboardingData,
    //     company: values
    //   }
    // })

    const { error } = await CTOnboarding.updateState({
      onboardingId: onboarding.id,
      nextUncompleteStep: findNextStep() || LAST_ONBOARDING_STEP.name,
      stepsDone: [...completedSteps, currentStepView],
      data: {
        ...onboardingData,
        company: values
      }
    })
    // TODO: Handle error case

    setOnboardingCompany(values)
    next()
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-full max-w-[800px] mx-auto py-[20px] space-y-[30px] px-4"
    >
      <H2>Configurați-vă compania</H2>
      <div className="flex flex-col gap-6">
        <FormRow>
          <Label>
            Numele companiei
            <RequiredFieldMark />
          </Label>
          <Input {...register("companyName")} />
          <InvalidInputError>{errors.companyName?.message}</InvalidInputError>
        </FormRow>

        <FormRow>
          <Label>
            CUI (Sau CIF)
            <RequiredFieldMark />
          </Label>
          <Input {...register("companyCui")} />
          <InvalidInputError>{errors.companyCui?.message}</InvalidInputError>
        </FormRow>

        <FormRow className="lg:flex-row gap-6">
          <FormRow>
            <Label>Numar Inregistrare</Label>
            <Input {...register("companyRegNumber")} />
          </FormRow>
          <FormRow>
            <Label>Domeniu companie</Label>
            <Input {...register("compnayEmailDomain")} />
          </FormRow>
        </FormRow>
      </div>
      <div className="flex justify-end">
        <ButtonWithLoading loading={isSubmitting} className="py-4 px-10">
          <TextCTA>
            Urmatorul
          </TextCTA>
        </ButtonWithLoading>
      </div>
    </form>
  )
}