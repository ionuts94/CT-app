import { NextRequest, NextResponse } from "next/server";

import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    const supabase = await createClient()

    if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
            return NextResponse.redirect(new URL("/sign-in?error=exchange_failed", req.url));
        }
    }
    return NextResponse.redirect(new URL("/onboarding", req.url));
}