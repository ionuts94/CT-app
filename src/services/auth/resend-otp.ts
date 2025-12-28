import { createClient } from "@/lib/supabase/server";

export async function resendOTP({ email }: { email: string }) {
  const supabase = await createClient()

  const { error } = await supabase.auth.resend({
    type: 'signup',
    email: email,
  })

  if (error) throw Error(error.message)

  return "OK"
}