import { CheckForOnboarding, GetAuthUser } from "@/actions/get/auth";
import { SignUpForm } from "./components/sign-up-form";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
    const { data: authUser } = await GetAuthUser()
    if (authUser) redirect("/")

    return (
        <main className="h-screen w-screen flex justify-center items-center">
            <SignUpForm />
        </main>
    )
}