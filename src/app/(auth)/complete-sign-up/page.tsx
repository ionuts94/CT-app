import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

type Props = {
    searchParams: Promise<{
        code: string
    }>
}

export default async function CompleteSignUpPage({ searchParams }: Props) {
    const { code } = await searchParams

    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code || "")

    if (data.user) {
        redirect("/onboarding")
    }


    return (
        <main>
            <div>Checking link...</div>
        </main>
    )
}