import { GetAuthUser } from "@/actions/get/auth"
import { createClient } from "@/lib/supabase/server"

export default async function OnboardingPage() {
    const r = await GetAuthUser()
    console.log("gere")
    console.log(r)

    return (
        <main>
            This is onboarding page
        </main>
    )
}