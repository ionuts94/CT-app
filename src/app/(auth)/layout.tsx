import { CheckForOnboarding } from "@/actions/post/auth";
import { withSafeService } from "@/lib/services-utils/with-safe-service";
import AuthService from "@/services/auth";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function AuthLayout({ children }: PropsWithChildren) {
  const { data: authUser } = await withSafeService(() => AuthService.getAuthUser())

  if (authUser) {
    await CheckForOnboarding(authUser)
    redirect("/dashboard")
  }

  return (
    <>
      {children}
    </>
  )
}