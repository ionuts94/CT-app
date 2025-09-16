"use client"

import { ButtonWithLoading } from "@/components/button-with-loading"
import { FormRow, Label } from "@/components/form-emelemts"
import { H2 } from "@/components/topography"
import { TextCTA } from "@/components/topography/cta"
import { useOnboardingContext } from "@/contexts/onboarding-context"
import { BrandingOnboarding, T_BrandingOnboardingSchema } from "@/validators/onboarding.validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Text } from "@/components/topography"
import { ArrowRight, UploadCloudIcon } from "lucide-react"
import { ColorPicker } from "@/components/color-picker"
import { OnboardingContractPreview } from "../../components/onboarding-contract-preview"

type Props = {

}

export const BrandingStep: React.FC<Props> = ({ }) => {
  const companyName = "Software Solutions"
  const { onboardingData, next } = useOnboardingContext()

  console.log("Onboarding data in branding")
  console.log(onboardingData)

  const form = useForm<T_BrandingOnboardingSchema>({
    resolver: zodResolver(BrandingOnboarding),
    defaultValues: {
      logoUrl: "",
      primaryColor: "",
      secondaryColor: "",
      accentColor: "",
    }
  })

  const { register, watch, handleSubmit, formState } = form
  const { isLoading, errors } = formState
  const values = watch()

  const handleFormSubmit = async (values: T_BrandingOnboardingSchema) => {
    next()
  }

  const onColorChange = (name: "primaryColor" | "secondaryColor" | "accentColor", value: string) => {
    form.setValue(name, value)
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-full max-w-[800px] mx-auto py-[20px] space-y-[30px] px-4"
    >
      <H2>Personalizează-ți spațiul de lucru</H2>
      <Text
        className="text-color-secondary"
        weight="semibold"
      >
        Încărcați sigla dvs. și alegeți culorile. Le puteți modifica oricând din setări
        <ArrowRight className=" inline-flex mx-1" size={14} />
        branding.
      </Text>

      <FormRow className="lg:flex-row gap-6">
        <FormRow className="lg:w-fit">
          <Label>Logo</Label>
          <div className="w-full size-[210px] lg:aspect-square bg-muted/60 rounded-xl text-color-secondary flex items-center justify-center gap-2 flex-col">
            <UploadCloudIcon strokeWidth={3} />
            <Text weight="semibold">Încărcați Logo</Text>
          </div>
          <Text size="sm" className="text-color-secondary">
            PNG sau SVG, max 8MB.
            <br />
            Background transparent este rocomandat.
          </Text>
        </FormRow>

        <FormRow className="flex flex-col justify-between">
          <FormRow>
            <Label>
              Culoare Primara
            </Label>
            <ColorPicker
              className="bg-muted/40"
              value={values.primaryColor || "#000"}
              onChange={(val) => onColorChange("primaryColor", val)}
            />
          </FormRow>

          <FormRow>
            <Label>
              Culoare Secundara
            </Label>
            <ColorPicker
              className="bg-muted/40"
              value={values.secondaryColor || "#000"}
              onChange={(val) => onColorChange("secondaryColor", val)}
            />
          </FormRow>

          <FormRow>
            <Label>
              Culoare Accent
            </Label>
            <ColorPicker
              className="bg-muted/40"
              value={values.accentColor || "#000"}
              onChange={(val) => onColorChange("accentColor", val)}
            />
          </FormRow>
          <Text size="sm" className="text-color-secondary">
            Sigla și culorile brandului dvs. vor fi aplicate în vizualizarea
            contractului de pe partea clientului.
          </Text>
        </FormRow>
      </FormRow>

      <FormRow>
        <OnboardingContractPreview
          companyName={companyName}
          primaryColor={values.primaryColor || "#000"}
        />
      </FormRow>

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