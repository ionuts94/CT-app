"use client"

import { ButtonWithLoading } from "@/components/button-with-loading"
import { H2, Text } from "@/components/topography"
import { TextCTA } from "@/components/topography/cta"
import { Card } from "@/components/ui/card"
import { useOnboardingContext } from "@/contexts/onboarding-context"
import { OnboardingContractPreview } from "../../components/onboarding-contract-preview"
import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { DialogTitle } from "@radix-ui/react-dialog"
import CTOnboarding from "@/sdk/onboarding"
import { DEFAULT_REDIRECT_AUTH_ROUTE } from "@/constants/others"

export const DoneStep: React.FC = ({ }) => {
  const router = useRouter()
  const { onboardingData, authUser } = useOnboardingContext()
  const [loading, setLoading] = useState(false)

  const handleCompleteOnboarding = async (redirectAfterComplete: string) => {
    setLoading(true)
    await CTOnboarding.complete()
    setLoading(false)
    router.replace(redirectAfterComplete)
  }

  const completeAndGoDashboard = () =>
    handleCompleteOnboarding(DEFAULT_REDIRECT_AUTH_ROUTE)

  const completeAndCreateTemplate = () =>
    handleCompleteOnboarding("/templates/new")

  return (
    <div className="w-full max-w-[800px] mx-auto py-[20px] space-y-[30px] px-4">
      <H2>✅ You’re all set</H2>

      <Text className="text-color-secondary" weight="semibold">
        Your account, company branding, and signature have been successfully
        configured. You can now start creating and managing contracts.
      </Text>

      <div className="grid lg:grid-cols-2 lg:grid-rows-2 gap-2">
        <Card className="p-4 gap-1">
          <Text className="text-color-secondary">Company</Text>
          <Text weight="semibold" size="lg">
            {onboardingData.company?.companyName}
          </Text>
        </Card>

        <Card className="p-4 gap-1">
          <Text className="text-color-secondary">Brand logo</Text>
          <Text weight="semibold" size="lg">
            {onboardingData.branding?.logoUrl ? "Uploaded" : "Not set"}
          </Text>
        </Card>

        <Card className="p-4 gap-1 items-start">
          <Text className="text-color-secondary">Signature</Text>
          {onboardingData?.signature?.url ? (
            <img
              className="h-10 object-contain"
              src={onboardingData.signature.url}
            />
          ) : (
            <Text weight="semibold" size="lg">
              Not set
            </Text>
          )}
        </Card>

        <Card className="p-4 gap-1">
          <Text className="text-color-secondary">Brand colors</Text>
          <div className="flex flex-col lg:flex-row gap-1 lg:justify-between">
            <Text className="flex flex-row items-center gap-1" size="lg" weight="semibold">
              <span
                className="size-5 rounded-sm"
                style={{ background: onboardingData?.branding?.primaryColor }}
              />
              Primary
            </Text>

            <Text className="flex flex-row items-center gap-1" size="lg" weight="semibold">
              <span
                className="size-5 rounded-sm"
                style={{ background: onboardingData?.branding?.secondaryColor }}
              />
              Secondary
            </Text>

            <Text className="flex flex-row items-center gap-1" size="lg" weight="semibold">
              <span
                className="size-5 rounded-sm"
                style={{ background: onboardingData?.branding?.accentColor }}
              />
              Accent
            </Text>
          </div>
        </Card>
      </div>

      <OnboardingContractPreview
        companyName={onboardingData.company?.companyName}
        logoUrl={onboardingData.branding?.logoUrl}
        primaryColor={onboardingData.branding?.primaryColor}
        signature={onboardingData.signature?.url}
        userName={
          authUser.user_metadata.firstName +
          " " +
          authUser.user_metadata.lastName
        }
      />

      <div className="flex flex-col lg:flex-row justify-end gap-4">
        <ButtonWithLoading
          onClick={completeAndCreateTemplate}
          variant="outline"
          className="py-4 px-10"
        >
          <TextCTA>Create your first template</TextCTA>
        </ButtonWithLoading>

        <ButtonWithLoading
          onClick={completeAndGoDashboard}
          className="py-4 px-10"
        >
          <TextCTA>Go to dashboard</TextCTA>
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
          <Text>Saving your settings…</Text>
        </DialogContent>
      </Dialog>
    </div>
  )
}
