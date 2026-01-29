"use client"

import {
  FormRow,
  Input,
  InvalidInputError,
  Label,
  RequiredFieldMark,
} from "@/components/form-elements"
import { AuthFormCard } from "../../components/auth-form-card"
import { ButtonWithLoading } from "@/components/button-with-loading"
import { Text } from "@/components/topography"
import { TextCTA } from "@/components/topography/cta"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { LoginSchema, T_LoginSchema } from "@/validators/auth.validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import CTAuth from "@/sdk/auth"
import { toast } from "sonner"
import { DEFAULT_REDIRECT_AUTH_ROUTE } from "@/constants/others"

type Props = {}

export const SignInForm: React.FC<Props> = ({ }) => {
  const router = useRouter()

  const form = useForm<T_LoginSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { handleSubmit, register, formState } = form
  const { isSubmitting, errors } = formState

  const handleSignIn = async (values: T_LoginSchema) => {
    const { error } = await CTAuth.signInWithPassword({
      email: values.email,
      password: values.password,
    })

    if (error) {
      toast.error(error)
      return
    }

    router.replace(DEFAULT_REDIRECT_AUTH_ROUTE)
  }

  return (
    <AuthFormCard
      heading="Sign in"
      subHeading="Welcome back! Sign in to continue."
    >
      <form
        onSubmit={handleSubmit(handleSignIn)}
        className="flex flex-col gap-4"
      >
        <FormRow>
          <Label className="text-black/70">
            <RequiredFieldMark />
            Email
          </Label>
          <Input {...register("email")} />
          <InvalidInputError>{errors.email?.message}</InvalidInputError>
        </FormRow>

        <FormRow>
          <Label className="text-black/70">
            <RequiredFieldMark />
            Password
          </Label>
          <Input {...register("password")} type="password" />
          <InvalidInputError>{errors.password?.message}</InvalidInputError>
        </FormRow>

        <FormRow className="w-full flex-row justify-end">
          <ButtonWithLoading className="py-4 px-12 w-full md:w-fit" loading={isSubmitting}>
            <TextCTA>Continue</TextCTA>
          </ButtonWithLoading>
        </FormRow>

        <Separator />

        <FormRow className="flex-row items-center justify-center">
          <Text>Don&apos;t have an account?</Text>
          <Link
            href="/sign-up"
            className="text-primary cursor-pointer transition hover:text-blue-900"
          >
            <TextCTA>Create one</TextCTA>
          </Link>
        </FormRow>

        <Text size="sm" className="text-color-secondary pb-2 text-center">
          By continuing, you agree to the Terms of Service and Privacy Policy.
        </Text>
      </form>
    </AuthFormCard>
  )
}
