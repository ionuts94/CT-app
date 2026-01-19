import { envs } from "@/constants/envs"
import { createClient } from "@/lib/supabase/server"
import { SignUpSchema, T_SignUpSchema } from "@/validators/auth.validator"

export async function signUpWithPassword({
  email,
  firstName,
  lastName,
  password,
  cPassword,
}: T_SignUpSchema) {
  const supabase = await createClient()

  const parsed = SignUpSchema.safeParse({
    email,
    firstName,
    lastName,
    password,
    cPassword,
  })

  if (!parsed.success) {
    throw new Error("Invalid sign-up payload")
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${envs.NEXT_PUBLIC_URL}/api/auth/callback`,
      data: {
        firstName,
        lastName,
        onboardingCompleted: false,
      },
    },
  })

  if (error) {
    throw new Error(`Sign-up failed: ${error.message}`)
  }

  return data.user
}
