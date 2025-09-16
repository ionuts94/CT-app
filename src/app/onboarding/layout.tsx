import { OnboardingProvider } from "@/contexts/onboarding-context";
import { PropsWithChildren } from "react";
import { OnboardingHeader } from "./components/onboarding-header";
import { GetAuthUser } from "@/actions/get/auth";
import { redirect } from "next/navigation";
import { GetUserOnboarding } from "@/actions/post/onboarding";

export default async function OnboardingLayout({ children }: PropsWithChildren) {
    const { data: authUser, error: authError } = await GetAuthUser()

    if (authError) {
        // TODO: Handle auth error
    }

    if (!authUser) {
        // TODO: Handle not authenticated
        redirect(process.env.NEXT_PUBLIC_URL + "/sign-up")
    }
    const { data, error } = await GetUserOnboarding({ userId: authUser.id })

    return (
        <OnboardingProvider data={data!}>
            <main className="min-h-screen flex flex-col">
                <OnboardingHeader />
                {children}
            </main>
        </OnboardingProvider>
    )
}