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
import { Card, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import SignaturePad from "./signature-pad"

type Props = {

}

export const SignatureStep: React.FC<Props> = ({ }) => {
  const companyName = "Software Solutions"
  const { next } = useOnboardingContext()

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
          <SignaturePad onChange={(s) => console.log(s)}
            onChangeMode="trimmed"
            onChangeDebounceMs={150} />
        </Card>
      </FormRow>



      <FormRow>

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