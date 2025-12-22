import { createClient } from "@/lib/supabase/server";
import { T_OTPOperationPayload } from "@/types/services/auth";

export async function verifyOTP({ email, token }: T_OTPOperationPayload) {
  const supabase = await createClient()

  const {
    data: { session },
    error,
  } = await supabase.auth.verifyOtp({
    email: email,
    token: token,
    type: 'email',
  })

  if (error) throw new Error(error.message)

  return session?.user
}