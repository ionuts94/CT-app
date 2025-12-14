import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import UserServices from "@/services/users";
import OnboardingService from "@/services/onboarding";

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

        await UserServices.createUserRecord({
            id: data.user.id,
            email: data.user.email!,
            firstName: data.user.user_metadata.firstName,
            lastName: data.user.user_metadata.lastName,
        })

        await OnboardingService.createUserOnboarding({ userId: data.user.id })
    }

    return NextResponse.redirect(new URL("/onboarding/company", req.url));
}