import { createClient } from "@/lib/supabase/server"
import { CustomApiResponse, Status } from "@/types/api-call"
import { jwtDecode } from "jwt-decode"
import { cache } from "react"

export async function GetAuthUserFunc(): Promise<CustomApiResponse<{ id: string }>> {
    console.log('checking signed user')
    const supabase = await createClient()

    try {
        // const auth = await supabase.auth.getUser()
        const { data, error } = await supabase.auth.getUser()

        if (error) {
            throw Error(error.message)
        }

        // if (auth.error) throw Error(auth.error.message)
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