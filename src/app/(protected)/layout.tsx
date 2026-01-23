import { Header } from "@/components/header";
import { AppSidebar } from "@/components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { envs } from "@/constants/envs";
import { UserProvider } from "@/contexts/user-context";
import { withSafeService } from "@/lib/services-utils/with-safe-service";
import { userMockData } from "@/mock-data/user";
import OnboardingService from "@/services/onboarding";
import UserService from "@/services/users";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function ProtectedLayout({ children }: PropsWithChildren) {
    const { data } = await withSafeService(() => UserService.getCurrentUserWithCompany())

    if (!data || !data.authUser) {
        redirect(envs.NEXT_PUBLIC_URL + "/sign-in")
    }

    await OnboardingService.checkUserOnboarding(data.authUser)

    return (
        <>
            <UserProvider authUser={data.authUser} user={data.user}>
                <SidebarProvider>
                    <AppSidebar />
                    <div className="w-full">
                        <Header />
                        {children}
                    </div>
                </SidebarProvider>
            </UserProvider>
        </>
    )
}