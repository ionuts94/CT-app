import { DEFAULT_REDIRECT_AUTH_ROUTE } from "@/constants/others";
import { withSafeService } from "@/lib/services-utils/with-safe-service";
import AuthService from "@/services/auth";
import OnboardingService from "@/services/onboarding";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function AuthLayout({ children }: PropsWithChildren) {
  const { data: authUser } = await withSafeService(() => AuthService.getAuthUser())

  if (authUser) {
    await OnboardingService.checkUserOnboarding(authUser)
    redirect(DEFAULT_REDIRECT_AUTH_ROUTE)
  }

  return (
    <>
      {children}
    </>
  )
}