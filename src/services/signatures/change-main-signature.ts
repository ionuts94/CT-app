import { createClient } from "@/lib/supabase/server";
import { T_ChangeMainSignaturePayload } from "@/types/services/signatures";
import AuthService from "../auth";

export async function changeMainSignature(payload: T_ChangeMainSignaturePayload) {
    const supabase = await createClient()
    const authUser = await AuthService.getAuthUser()
    await supabase.from("signatures")
        .update({ isMainSignature: false })
        .eq("userId", authUser.id)

    const { error } = await supabase.from("signatures")
        .update({ isMainSignature: true })
        .eq("userId", authUser.id)
        .eq("id", payload.newMainSignatureId)
        .maybeSingle()

    if (error) {
        console.warn(`Failed to update main signature for user: ${authUser.id}. Error: ${error.message}`)
        throw new Error("Please try again later")
    }

    return "OK"
}