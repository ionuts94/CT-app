import { GetAuthUser } from "@/actions/get/auth"
import { OnboardingProvider } from "@/contexts/onboarding-context"
import { Onboarding } from "./components/onboarding"

export default async function OnboardingPage() {
    const r = await GetAuthUser()

    return (
        <main className="h-screen w-screen flex items-center justify-center bg-app">
            <OnboardingProvider initialStep="company">
                <Onboarding />
            </OnboardingProvider>
        </main>
    )
}