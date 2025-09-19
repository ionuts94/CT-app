import { GetUserOnboarding } from "@/actions/post/onboarding"
import { FIRST_ONBOARDING_STEP } from "@/app/onboarding/components/stepts"
import { createClient } from "@/lib/supabase/server"
import { CustomApiResponse, Status } from "@/types/api-call"
import { User } from "@supabase/supabase-js"
import { redirect } from "next/navigation"
import { cache } from "react"

export async function GetAuthUserFunc(): Promise<CustomApiResponse<User>> {
    console.log('checking signed user')
    const supabase = await createClient()

    try {
        const { data, error } = await supabase.auth.getUser()

        if (error) {
            throw Error(error.message)
        }

        return {
            status: Status.SUCCESS,
            data: data.user
        }
    } catch (err: any) {
        const errMessage = `Unable to retrieve auth user. Error: ${err.message}`;
        console.log(errMessage);
        return {
            status: Status.FAILED,
            error: "Unable to retrieve auth user. Error: " + err.message
        }
    }
}

export const CheckIsSignedUser = GetAuthUserFunc // Just for readability
export const GetAuthUser = cache(GetAuthUserFunc)

export async function CheckForOnboarding(user: User) {
    if (user?.user_metadata?.onboardingCompleted) return;
    const { data } = await GetUserOnboarding({ userId: user.id })
    return redirect(process.env.NEXT_PUBLIC_URL + "/onboarding/" + (data?.nextUncompleteStep || FIRST_ONBOARDING_STEP.name))
}