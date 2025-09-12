"use client"

import { ButtonWithLoading } from "@/components/button-with-loading"
import { FormRow, Input, InvalidInputError, Label, RequiredFieldMark } from "@/components/form-emelemts"
import { H1, H2 } from "@/components/topography"
import { TextCTA } from "@/components/topography/cta"
import { useOnboardingContext } from "@/contexts/onboarding-context"

import { CompanyOnboarding, T_CompanyOnboardingSchema } from "@/validators/onboarding.validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

type Props = {

}

export const CompanyStep: React.FC<Props> = ({ }) => {
  const { next } = useOnboardingContext()

  const form = useForm<T_CompanyOnboardingSchema>({
    resolver: zodResolver(CompanyOnboarding),
    defaultValues: {
      companyName: "",
      companyCui: "",
      companyRegNumber: "",
      compnayEmailDomain: ""
    }
  })

  const { register, watch, handleSubmit, formState } = form
  const { isLoading, errors } = formState

  const handleFormSubmit = async (values: T_CompanyOnboardingSchema) => {
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
        <ButtonWithLoading className="py-4 px-10">
          <TextCTA>
            Urmatorul
          </TextCTA>
        </ButtonWithLoading>
      </div>
    </form>
  )
}