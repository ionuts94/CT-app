import { OnboardingProvider } from "@/contexts/onboarding-context";
import { PropsWithChildren } from "react";
import { OnboardingHeader } from "./components/onboarding-header";

export default async function OnboardingLayout({ children }: PropsWithChildren) {
    return (
        <OnboardingProvider initialStep="company">
            <main className="min-h-screen flex flex-col">
                <OnboardingHeader />
                {children}
            </main>
        </OnboardingProvider>
    )
}