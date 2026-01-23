"use client"

import { ButtonWithLoading } from "@/components/button-with-loading"
import { FormRow, Input, Label } from "@/components/form-elements"
import { H2, Text } from "@/components/topography"
import { TextCTA } from "@/components/topography/cta"
import { useOnboardingContext } from "@/contexts/onboarding-context"
import {
  BrandingOnboarding,
  T_BrandingOnboardingSchema,
} from "@/validators/onboarding.validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ArrowRight, UploadCloudIcon } from "lucide-react"
import { ColorPicker } from "@/components/color-picker"
import { LAST_ONBOARDING_STEP } from "../../components/stepts"
import { ChangeEvent, useState } from "react"
import { BUCKETS } from "@/constants/buckets"
import CTOnboarding from "@/sdk/onboarding"
import { v4 as uuid } from "uuid"
import { cn } from "@/lib/utils"
import Image from "next/image"
import CTStorage from "@/sdk/storage"
import { InputImage } from "@/components/image-upload-input"

export const BrandingStep: React.FC = () => {
  const {
    onboarding,
    currentStepView,
    completedSteps,
    onboardingData,
    next,
    findNextStep,
    setOnboardingBranding,
  } = useOnboardingContext()

  const [hoverInput, setHoverInput] = useState(false)
  const [imagePreviewUrl, setImagePreviewUrl] = useState("")

  const form = useForm<T_BrandingOnboardingSchema>({
    resolver: zodResolver(BrandingOnboarding),
    defaultValues: {
      logoUrl: onboardingData?.branding?.logoUrl || "",
      primaryColor: onboardingData?.branding?.primaryColor || "#000",
      secondaryColor: onboardingData?.branding?.secondaryColor || "#000",
      accentColor: onboardingData?.branding?.accentColor || "#000",
    },
  })

  const { watch, handleSubmit, formState } = form
  const values = watch()

  const handleFormSubmit = async (values: T_BrandingOnboardingSchema) => {
    await CTOnboarding.updateState({
      onboardingId: onboarding.id,
      nextUncompleteStep: findNextStep() || LAST_ONBOARDING_STEP.name,
      stepsDone: [...completedSteps, currentStepView],
      data: {
        ...onboardingData,
        branding: values,
      },
    })

    setOnboardingBranding(values)
    next()
  }

  const onColorChange = (
    name: "primaryColor" | "secondaryColor" | "accentColor",
    value: string
  ) => {
    form.setValue(name, value)
  }

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const { data } = await CTStorage.storeFile({
      file,
      bucket: BUCKETS.logos,
      filePath: `${file.name}-${uuid()}`,
    })

    form.setValue("logoUrl", data?.fileUrl || "")
  }

  console.log(values)

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-full max-w-[800px] mx-auto py-[20px] space-y-[30px] px-4"
    >
      <H2>Customize your workspace</H2>

      <Text className="text-color-secondary" weight="semibold">
        Upload your logo and choose your brand colors. You can update them anytime
        from <ArrowRight className="inline-flex mx-1" size={14} /> branding settings.
      </Text>

      <FormRow className="lg:flex-row gap-6">
        <FormRow className="lg:w-fit">
          <Label>Logo</Label>

          <InputImage
            onImageChange={handleImageChange}
            placeholder="Upload logo"
            defaultPreviewUrl={values.logoUrl}
          />

          <Text size="sm" className="text-color-secondary">
            PNG or SVG, max 8MB.
            <br />
            Transparent background recommended.
          </Text>
        </FormRow>

        <FormRow className="flex flex-col justify-between">
          <FormRow>
            <Label>Primary color</Label>
            <ColorPicker
              className="bg-muted/40"
              value={values.primaryColor}
              onChange={(val) => onColorChange("primaryColor", val)}
            />
          </FormRow>

          <FormRow>
            <Label>Secondary color</Label>
            <ColorPicker
              className="bg-muted/40"
              value={values.secondaryColor}
              onChange={(val) => onColorChange("secondaryColor", val)}
            />
          </FormRow>

          <FormRow>
            <Label>Accent color</Label>
            <ColorPicker
              className="bg-muted/40"
              value={values.accentColor}
              onChange={(val) => onColorChange("accentColor", val)}
            />
          </FormRow>

          <Text size="sm" className="text-color-secondary">
            Your logo and brand colors will be applied to the client-facing
            contract view.
          </Text>
        </FormRow>
      </FormRow>

      <div className="flex justify-end">
        <ButtonWithLoading loading={formState.isSubmitting} className="py-4 px-10">
          <TextCTA>Next</TextCTA>
        </ButtonWithLoading>
      </div>
    </form>
  )
}
