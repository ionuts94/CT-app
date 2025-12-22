import { createClient } from "@/lib/supabase/server";
import { T_OTPOperationPayload } from "@/types/services/auth";

export async function resendOTP({ email }: T_OTPOperationPayload) {
  const supabase = await createClient()
}