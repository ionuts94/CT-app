"use client"

import { ButtonWithLoading } from "@/components/button-with-loading"
import { FormRow, Input, InvalidInputError, Label, RequiredFieldMark } from "@/components/form-elements"
import { Text } from "@/components/topography"
import { TextCTA } from "@/components/topography/cta"
import { Separator } from "@/components/ui/separator"
import { SignUpSchema, T_SignUpSchema } from "@/validators/auth.validator"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { AuthFormCard } from "../../components/auth-form-card"
import CTAuth from "@/sdk/auth"
import { toast } from "sonner"
import { ConfirmOTPWindow } from "./confirm-otp-window"

type Props = {}

export const SignUpForm: React.FC<Props> = ({ }) => {
    const form = useForm<T_SignUpSchema>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            cPassword: ""
        }
    })

    const { register, handleSubmit, formState } = form
    const { errors, isSubmitting, isSubmitSuccessful } = formState
    const email = form.watch("email")

    const handleSignUp = async (values: T_SignUpSchema) => {
        const { error } = await CTAuth.signUpWithPassword(values)
        if (error) {
            toast.error(error)
        }
    }

    if (isSubmitSuccessful) {
        return (
            <ConfirmOTPWindow email={email} />
        )
    }

    return (
        <AuthFormCard
            heading="Create your account"
            subHeading="Start for free. No card required. Takes 2 minutes"
        >
            <form
                onSubmit={handleSubmit(handleSignUp)}
                className="flex flex-col gap-4"
            >
                <FormRow className="flex-row justify-between items-center gap-2">
                    <FormRow>
                        <Label className="text-black/70">
                            <RequiredFieldMark />First name
                        </Label>
                        <Input {...register("firstName")} />
                        <InvalidInputError>{errors.firstName?.message}</InvalidInputError>
                    </FormRow>
                    <FormRow>
                        <Label className="text-black/70">
                            <RequiredFieldMark />Last name
                        </Label>
                        <Input {...register("lastName")} />
                        <InvalidInputError>{errors.lastName?.message}</InvalidInputError>
                    </FormRow>
                </FormRow>

                <FormRow>
                    <Label className="text-black/70">
                        <RequiredFieldMark />Email
                    </Label>
                    <Input {...register("email")} />
                    <InvalidInputError>{errors.email?.message}</InvalidInputError>
                </FormRow>

                <FormRow>
                    <Label className="text-black/70">
                        <RequiredFieldMark />Password
                    </Label>
                    <Input {...register("password")} type="password" />
                    <InvalidInputError>{errors.password?.message}</InvalidInputError>
                </FormRow>

                <FormRow>
                    <Label className="text-black/70">
                        <RequiredFieldMark />Confirm password
                    </Label>
                    <Input {...register("cPassword")} type="password" />
                    <InvalidInputError>{errors.cPassword?.message}</InvalidInputError>
                </FormRow>

                <FormRow className="w-full flex-row justify-end">
                    <ButtonWithLoading className="py-4 px-12" loading={isSubmitting}>
                        <TextCTA>
                            Continue
                        </TextCTA>
                    </ButtonWithLoading>
                </FormRow>

                <Separator />

                <FormRow className="flex-row items-center justify-center">
                    <Text>Already have an account?</Text>
                    <Link
                        href="/sign-in"
                        className="text-primary cursor-pointer transition hover:text-blue-900"
                    >
                        <TextCTA>Sign in</TextCTA>
                    </Link>
                </FormRow>

                <Text size="sm" className="text-color-secondary pb-2 text-center">
                    By continuing, you agree to the Terms and Privacy Policy.
                </Text>
            </form>
        </AuthFormCard>
    )
}
