import { CheckForOnboarding, GetAuthUser } from "@/actions/get/auth";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function AuthLayout({ children }: PropsWithChildren) {
  const { data: authUser } = await GetAuthUser()
  if (authUser) {
    await CheckForOnboarding(authUser)
    redirect("/")
  }
  return (
    <>
      {children}
    </>
  )
}