import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { CreateUserRecord } from "@/actions/post/user";
import { CreateOnboardingForUser } from "@/actions/post/onboarding";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    const supabase = await createClient()

    if (code) {
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);
        console.log("Data in authcallback")
        console.log(data)

        if (error) {
            return NextResponse.redirect(new URL("/sign-in?error=exchange_failed", req.url));
        }
        await CreateUserRecord({
            id: data.user.id,
            email: data.user.email,
            firstName: data.user.user_metadata.firstName,
            lastName: data.user.user_metadata.lastName,
        })
        await CreateOnboardingForUser({ userId: data.user.id })
    }

    return NextResponse.redirect(new URL("/onboarding/company", req.url));
}