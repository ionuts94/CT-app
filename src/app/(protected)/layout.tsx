import { CheckForOnboarding, GetAuthUser } from "@/actions/post/auth";
import { Header } from "@/components/header";
import { AppSidebar } from "@/components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { envs } from "@/constants/envs";
import { userMockData } from "@/mock-data/user";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function ProtectedLayout({ children }: PropsWithChildren) {
    const { data, error } = await GetAuthUser()
    if (error || !data) {
        redirect(envs.NEXT_PUBLIC_URL + "/sign-in")
    }
    await CheckForOnboarding(data)

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