import { createClient } from "@/lib/supabase/server";
import AuthService from "../auth";
import { T_AuthUserWithProfileAndSubscription } from "@/types/services/users";

export async function getCurrentUserWithSubscription(): Promise<T_AuthUserWithProfileAndSubscription> {
    const supabase = await createClient()
    const authUser = await AuthService.getAuthUser()

    const { data: profile, error } = await supabase
        .from("users")
        .select("*, subscription: subscriptions(*)")
        .eq("id", authUser.id)
        .maybeSingle();

    if (error) {
        throw new Error("Failed to load user with company: " + error.message);
    }

    if (!profile) {
        throw new Error("Authenticated user not found in database.");
    }

    return {
        authUser,
        user: profile
    }
}