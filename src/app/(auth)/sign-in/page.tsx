import { GetAuthUser } from "@/actions/post/auth";
import { redirect } from "next/navigation";
import { SignInForm } from "./components/sign-in-form";

export default async function SignInPage() {
  const { data: authUser } = await GetAuthUser()
  if (authUser) return redirect("/")

  return (
    <main className="h-screen w-screen flex justify-center items-center">
      <SignInForm />
    </main>
  )
}