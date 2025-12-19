import { Header } from "@/components/header";
import { AppSidebar } from "@/components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { envs } from "@/constants/envs";
import { withSafeService } from "@/lib/services-utils/with-safe-service";
import { userMockData } from "@/mock-data/user";
import AuthService from "@/services/auth";
import OnboardingService from "@/services/onboarding";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function ProtectedLayout({ children }: PropsWithChildren) {
    const { data: authUser } = await withSafeService(() => AuthService.getAuthUser())

    if (!authUser) {
        redirect(envs.NEXT_PUBLIC_URL + "/sign-in")
    }

    await OnboardingService.checkUserOnboarding(authUser)

    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <div className="w-full">
                    <Header user={userMockData as any} />
                    {children}
                </div>
            </SidebarProvider>
        </>
    )
}