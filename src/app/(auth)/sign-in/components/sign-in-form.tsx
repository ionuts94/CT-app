"use client"

import { FormRow, Input, InvalidInputError, Label, RequiredFieldMark } from "@/components/form-elements"
import { AuthFormCard } from "../../components/auth-form-card"
import { ButtonWithLoading } from "@/components/button-with-loading"
import { Text } from "@/components/topography"
import { TextCTA } from "@/components/topography/cta"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { email } from "zod/v4"
import { LoginSchema, T_LoginSchema } from "@/validators/auth.validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignIn } from "@/actions/post/auth"
import { useRouter } from "next/navigation"
import CTAuth from "@/sdk/auth"

type Props = {

}

export const SignInForm: React.FC<Props> = ({ }) => {
  const router = useRouter()
  const form = useForm<T_LoginSchema>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const { handleSubmit, register, formState } = form
  const { isSubmitting, errors } = formState

  const handleSignIn = async (values: T_LoginSchema) => {
    console.time("Logging")
    const { error } = await CTAuth.signInWithPassword({
      email: values.email,
      password: values.password
    })
    console.timeEnd("Logging")

    if (error) {

    }

    router.replace("/dashboard")
  }


  return (
    <AuthFormCard
      heading="Autentificare"
      subHeading="Bine ai revenit! Intra in contul tau pentru a continua"
    >
      <form
        onSubmit={handleSubmit(handleSignIn)}
        className="flex flex-col gap-4"
      >
        <FormRow>
          <Label className="text-black/70"><RequiredFieldMark />Email</Label>
          <Input {...register("email")} />
          <InvalidInputError>{errors.email?.message}</InvalidInputError>
        </FormRow>
        <FormRow>
          <Label className="text-black/70"><RequiredFieldMark />Parola</Label>
          <Input {...register("password")} type="password" />
          <InvalidInputError>{errors.password?.message}</InvalidInputError>
        </FormRow>

        <FormRow className="w-full flex-row justify-end">
          <ButtonWithLoading className="py-4 px-12" loading={isSubmitting}>
            <TextCTA>
              Continua
            </TextCTA>
          </ButtonWithLoading>
        </FormRow>
        <Separator />
        <FormRow className="flex-row items-center justify-center">
          <Text>Nu ai cont? </Text>
          <Link href="/sign-up" className="text-primary cursor-pointer transition hover:text-blue-900">
            <TextCTA>Creeaza unul</TextCTA>
          </Link>
        </FormRow>
        <Text size="sm" className="text-color-secondary pb-2 text-center">
          Continuand, esti de acord cu Termenii si Politica de Confidentialitate.
        </Text>
      </form>
    </AuthFormCard>
  )
}