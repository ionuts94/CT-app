import { Header } from "@/components/header";
import { AppSidebar } from "@/components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { envs } from "@/constants/envs";
import { UserProvider } from "@/contexts/user-context";
import { withSafeService } from "@/lib/services-utils/with-safe-service";
import AuthService from "@/services/auth";
import OnboardingService from "@/services/onboarding";
import UserService from "@/services/users";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function ProtectedLayout({ children }: PropsWithChildren) {
    const { data: authUser } = await withSafeService(
        () => AuthService.getAuthUser()
    )

    if (!authUser) {
        redirect(envs.NEXT_PUBLIC_URL + "/sign-in")
    }
    await OnboardingService.checkUserOnboarding(authUser)

    const { data: userWithCompany } = await withSafeService(
        () => UserService.getUserWithCompany({ userId: authUser.id })
    )

    return (
        <>
            <UserProvider authUser={authUser} user={userWithCompany!}>
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