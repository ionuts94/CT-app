"use client"

import { ButtonWithLoading } from "@/components/button-with-loading"
import { H2 } from "@/components/topography"
import { Text } from "@/components/topography"
import { TextCTA } from "@/components/topography/cta"
import { Card } from "@/components/ui/card"
import { useOnboardingContext } from "@/contexts/onboarding-context"
import { OnboardingContractPreview } from "../../components/onboarding-contract-preview"
import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { CompleteOnboarding } from "@/actions/post/onboarding"
import { DialogTitle } from "@radix-ui/react-dialog"

export const DoneStep: React.FC = ({ }) => {
  const router = useRouter()
  const { onboardingData, authUser } = useOnboardingContext()
  const [loading, setLoading] = useState(false)

  const handleCompleteOnboarding = async (redirectAfterComplete: string) => {
    setLoading(true)
    const { error } = await CompleteOnboarding()
    setLoading(false)
    router.replace(redirectAfterComplete)
  }

  const completeAndGoDashboard = () => handleCompleteOnboarding("/dashboard")
  const completeAndCreateTemplate = () => handleCompleteOnboarding("/templates/new")

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
        userName={authUser.user_metadata.firstName + " " + authUser.user_metadata.lastName}
      />

      <div className="flex flex-col lg:flex-row justify-end gap-4">
        <ButtonWithLoading onClick={completeAndCreateTemplate} variant="outline" className="py-4 px-10">
          <TextCTA>
            Creeaza un template
          </TextCTA>
        </ButtonWithLoading>
        <ButtonWithLoading onClick={completeAndGoDashboard} className="py-4 px-10">
          <TextCTA>
            Mergi la dashboard
          </TextCTA>
        </ButtonWithLoading>
      </div>
      <Dialog open={loading}>
        <DialogContent
          className="size-[250px] flex items-center justify-center flex-col"
          overlayClassName="bg-white/80"
          showCloseButton={false}
        >
          <DialogTitle className="hidden" />
          <div className="size-10 border-[5px] border-l-primary border-t-primary border-r-primary border-b-transparent rounded-full animate-spin" />
          <Text>Stocam informatiile</Text>
        </DialogContent>
      </Dialog>
    </div>
  )
}