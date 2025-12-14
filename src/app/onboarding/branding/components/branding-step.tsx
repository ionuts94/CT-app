"use client"

import { ButtonWithLoading } from "@/components/button-with-loading"
import { FormRow, Input, Label } from "@/components/form-elements"
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
import { UpdateOnboardingState } from "@/actions/post/onboarding"
import { LAST_ONBOARDING_STEP } from "../../components/stepts"
import { ChangeEvent, useState } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { SupabaseStoreFile } from "@/actions/post/storage"
import { BUCKETS } from "@/constants/buckets"
import { v4 as uuid } from "uuid"
import CTOnboarding from "@/sdk/onboarding"

export const BrandingStep: React.FC = ({ }) => {
  const { onboarding, currentStepView, completedSteps, onboardingData, next, findNextStep, setOnboardingBranding } = useOnboardingContext()
  const [hoverInput, setHoverInput] = useState(false)
  const [imagePreviewUrl, setImagePreviewUrl] = useState("")

  const form = useForm<T_BrandingOnboardingSchema>({
    resolver: zodResolver(BrandingOnboarding),
    defaultValues: {
      logoUrl: onboardingData?.branding?.logoUrl || "",
      primaryColor: onboardingData?.branding?.primaryColor || "#000",
      secondaryColor: onboardingData?.branding?.secondaryColor || "#000",
      accentColor: onboardingData?.branding?.accentColor || "#000",
    }
  })

  const { watch, handleSubmit, formState } = form
  const values = watch()

  const handleFormSubmit = async (values: T_BrandingOnboardingSchema) => {
    const { error } = await CTOnboarding.updateState({
      onboardingId: onboarding.id,
      nextUncompleteStep: findNextStep() || LAST_ONBOARDING_STEP.name,
      stepsDone: [...completedSteps, currentStepView],
      data: {
        ...onboardingData,
        branding: values
      }
    })
    setOnboardingBranding(values)
    next()
  }

  const onColorChange = (name: "primaryColor" | "secondaryColor" | "accentColor", value: string) => {
    form.setValue(name, value)
  }

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File
    if (!file) return;
    const imageD = URL.createObjectURL(file)
    setImagePreviewUrl(imageD)
    const { data } = await SupabaseStoreFile({
      file,
      bucket: BUCKETS.logos,
      filePath: file.name + uuid()
    })
    form.setValue("logoUrl", data?.fileUrl || "")
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
          <div
            className={cn(
              "w-full size-[210px] lg:aspect-square bg-muted/60 rounded-xl text-color-secondary flex items-center justify-center gap-2 flex-col relative",
              hoverInput && "opacity-70 border-[2px] border-dashed border-black/80"
            )}
          >
            <Input
              type="file"
              className="absolute top-0 left-0 right-0 bottom-0 z-10 opacity-0 cursor-pointer"
              onMouseEnter={() => setHoverInput(true)}
              onMouseLeave={() => setHoverInput(false)}
              onChange={handleImageChange}
            />
            {(imagePreviewUrl || values.logoUrl) ? (
              <Image src={imagePreviewUrl || values.logoUrl} alt="logo preview" fill objectFit="contain" />
            ) : (
              <>
                <UploadCloudIcon strokeWidth={3} />
                <Text weight="semibold">Încărcați Logo</Text>
              </>
            )
            }
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
              value={values.primaryColor}
              onChange={(val) => onColorChange("primaryColor", val)}
            />
          </FormRow>

          <FormRow>
            <Label>
              Culoare Secundara
            </Label>
            <ColorPicker
              className="bg-muted/40"
              value={values.secondaryColor}
              onChange={(val) => onColorChange("secondaryColor", val)}
            />
          </FormRow>

          <FormRow>
            <Label>
              Culoare Accent
            </Label>
            <ColorPicker
              className="bg-muted/40"
              value={values.accentColor}
              onChange={(val) => onColorChange("accentColor", val)}
            />
          </FormRow>
          <Text size="sm" className="text-color-secondary">
            Sigla și culorile brandului dvs. vor fi aplicate în vizualizarea
            contractului de pe partea clientului.
          </Text>
        </FormRow>
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