import { Header } from "@/components/header";
import { AppSidebar } from "@/components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { userMockData } from "@/mock-data/user";
import { PropsWithChildren } from "react";

export default function ProtectedLayout({ children }: PropsWithChildren) {
    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <div className="w-full">
                    <Header user={userMockData} />
                    {children}
                </div>
            </SidebarProvider>
        </>
    )
}