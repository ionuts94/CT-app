import { httpPost } from "../http";
import { api } from "@/app/api/endpoints";
import { User } from "@supabase/supabase-js";
import { T_SignUpSchema } from "@/validators/auth.validator";

export async function signUpWithPassword(payload: T_SignUpSchema) {
  return httpPost<User>(api.auth.signUpWithPassword, payload)
}