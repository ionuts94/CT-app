"use client"

import { ButtonWithLoading } from "@/components/button-with-loading"
import { H2 } from "@/components/topography"
import { Text } from "@/components/topography"
import { TextCTA } from "@/components/topography/cta"
import { Card } from "@/components/ui/card"
import { useOnboardingContext } from "@/contexts/onboarding-context"
import { ArrowRight } from "lucide-react"
import { OnboardingContractPreview } from "../../components/onboarding-contract-preview"

type Props = {

}

const TEST_DATA = {
  companyName: "Software Solutions",
  brandLogo: "Uploaded",
  signature: "Ionut Sandu",
  branding: {
    logoUrl: "",
    primaryColor: "red",
    secondaryColor: "blue",
    accentColor: "yellow",
  },
  userName: "Ionut Sandu"
}

export const DoneStep: React.FC<Props> = ({ }) => {
  const { next, onboarding, onboardingData } = useOnboardingContext()

  return (
    <div className="w-full max-w-[800px] mx-auto py-[20px] space-y-[30px] px-4" >
      <H2>✅ Totul este pregătit</H2>
      <Text className="text-color-secondary" weight="semibold">
        Contul, identitatea vizuală a companiei și semnătura au fost configurate. Acum puteți începe să gestionați contractele.
      </Text>
      <div className="grid lg:grid-cols-2 lg:grid-rows-2 gap-2">
        <Card className="p-4 gap-1">
          <Text className="text-color-secondary">Companie</Text>
          <Text weight="semibold" size="lg">{onboardingData.company?.companyName}</Text>
        </Card>
        <Card className="p-4 gap-1">
          <Text className="text-color-secondary">Siglă Brand</Text>
          <Text weight="semibold" size="lg">{onboardingData.branding?.logoUrl ? "Incarcat" : "Nesetat"}</Text>
        </Card>
        <Card className="p-4 gap-1 items-start">
          <Text className="text-color-secondary">Semnătură</Text>
          {onboardingData?.signature?.url
            ? <img className="h-10 object-contain" src={onboardingData?.signature?.url} />
            : <Text weight="semibold" size="lg">Nesetat</Text>
          }

        </Card>
        <Card className="p-4 gap-1">
          <Text className="text-color-secondary">Culori</Text>
          <div className="flex flex-col lg:flex-row gap-1 lg:justify-between">
            <Text className="flex flex-row items-center gap-1" size="lg" weight="semibold">
              <span className="size-5 rounded-sm gap-1" style={{ background: onboardingData?.branding?.primaryColor }}></span>
              Primar
            </Text>
            <Text className="flex flex-row items-center gap-1" size="lg" weight="semibold">
              <span className="size-5 rounded-sm gap-1" style={{ background: onboardingData?.branding?.secondaryColor }}></span>
              Secundar
            </Text>
            <Text className="flex flex-row items-center gap-1" size="lg" weight="semibold">
              <span className="size-5 rounded-sm gap-1" style={{ background: onboardingData?.branding?.accentColor }}></span>
              Accent
            </Text>
          </div>
        </Card>
      </div>

      <OnboardingContractPreview
        companyName={onboardingData?.company?.companyName}
        logoUrl={onboardingData?.branding?.logoUrl}
        primaryColor={onboardingData?.branding?.primaryColor}
        signature={onboardingData?.signature?.url}
        userName={TEST_DATA.userName}
      />

      <div className="flex justify-end gap-4">
        <ButtonWithLoading variant="outline" className="py-4 px-10">
          <TextCTA>
            Creeaza un template
          </TextCTA>
        </ButtonWithLoading>
        <ButtonWithLoading className="py-4 px-10">
          <TextCTA>
            Mergi la dashboard
          </TextCTA>
        </ButtonWithLoading>
      </div>
    </div>
  )
}