import { createClient } from "@/lib/supabase/server";
import AuthService from "../auth";
import { T_AuthUserWithProfileAndSubscription } from "@/types/services/users";
import { SubscriptionStatus } from "@prisma/client";

export async function getCurrentUserWithSubscription(): Promise<T_AuthUserWithProfileAndSubscription> {
    const supabase = await createClient()
    const authUser = await AuthService.getAuthUser()

    const [
        { data: profile, error },
        { data: subscription, error: subscriptionError }
    ] = await Promise.all([
        supabase
            .from("users")
            .select("*")
            .eq("id", authUser.id)
            .maybeSingle(),
        await supabase.from("subscriptions")
            .select("*")
            .eq("userId", authUser.id)
            .eq("status", SubscriptionStatus.ACTIVE)
            .order("currentPeriodEnd", { ascending: false })
            .limit(1)
    ])

    if (error) {
        throw new Error("Failed to load user with company: " + error.message);
    }

    if (!profile) {
        throw new Error("Authenticated user not found in database.");
    }

    return {
        authUser,
        user: profile,
        subscription: subscription?.[0]
    }
}