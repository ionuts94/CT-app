import { OnboardingProvider } from "@/contexts/onboarding-context";
import { PropsWithChildren } from "react";
import { OnboardingHeader } from "./components/onboarding-header";
import { redirect } from "next/navigation";
import { envs } from "@/constants/envs";
import { withSafeService } from "@/lib/services-utils/with-safe-service";
import OnboardingService from "@/services/onboarding";
import AuthService from "@/services/auth";

export default async function OnboardingLayout({ children }: PropsWithChildren) {
    const { data: authUser } = await withSafeService(() => AuthService.getAuthUser())

    if (!authUser) {
        redirect(envs.NEXT_PUBLIC_URL + "/sign-up")
    }

    if (authUser.user_metadata.onboardingCompleted) {
        return redirect("/")
    }

    const { data } = await withSafeService(() => OnboardingService.getUserOnboarding({ userId: authUser.id }))

    return (
        <OnboardingProvider data={data!} authUser={authUser}>
            <main className="min-h-screen flex flex-col">
                <OnboardingHeader />
                {children}
            </main>
        </OnboardingProvider>
    )
}