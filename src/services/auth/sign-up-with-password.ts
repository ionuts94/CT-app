import { envs } from "@/constants/envs";
import { createClient } from "@/lib/supabase/server";
import { SignUpSchema, T_SignUpSchema } from "@/validators/auth.validator";

export async function signUpWithPassword({
  email,
  firstName,
  lastName,
  password,
  cPassword
}: T_SignUpSchema) {
  const supabase = await createClient();

  const parsedValues = SignUpSchema.safeParse({
    email,
    firstName,
    lastName,
    password,
    cPassword
  })

  if (parsedValues.error) {
    throw Error(parsedValues.error.message)
  }

  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      emailRedirectTo: envs.NEXT_PUBLIC_URL + "/api/auth/callback",
      data: {
        firstName,
        lastName,
        onboardingCompleted: false
      }
    },
  })

  if (error) throw Error("Am intampinat o eroare: " + error.message)

  return data.user
}