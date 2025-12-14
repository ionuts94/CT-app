"use client"

import { SignUp } from "@/actions/post/auth"
import { ButtonWithLoading } from "@/components/button-with-loading"
import { FormRow, Input, InvalidInputError, Label, RequiredFieldMark } from "@/components/form-elements"
import { Body, H1, H2, Text } from "@/components/topography"
import { TextCTA } from "@/components/topography/cta"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SignUpSchema, T_SignUpSchema } from "@/validators/auth.validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { ReceiptText } from "lucide-react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { AuthFormCard } from "../../components/auth-form-card"
import CTAuth from "@/sdk/auth"

type Props = {

}

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
    const { errors, isSubmitting } = formState

    const handleSignUp = async (values: T_SignUpSchema) => {
        const { error } = await CTAuth.signUpWithPassword(values)
        if (error) {
            throw Error(error)
        }
    }

    if (formState.isSubmitSuccessful) {
        return (
            <Card className="w-full max-w-[800px] p-4">
                <div className="text-primary font-bold flex gap-2 items-center">
                    <ReceiptText size={30} />
                    <Text className="text-black text-md font-semibold">CONTRACT TRANSPARENT</Text>
                </div>
                <div className="flex flex-col gap-2">
                    <H2>Verifica-ti emailul</H2>
                    <Body className="text-color-secondary">Ti-am trimis un link de verificare pe email</Body>
                </div>
            </Card>
        )
    }

    return (
        <AuthFormCard
            heading="Creaza-ti contul"
            subHeading="Incepe gratuit. Fara card. Dureaza 2 minute"
        >
            <form
                onSubmit={handleSubmit(handleSignUp)}
                className="flex flex-col gap-4"
            >
                <FormRow className="flex-row justify-between items-center gap-2">
                    <FormRow >
                        <Label className="text-black/70"><RequiredFieldMark />Nume</Label>
                        <Input {...register("lastName")} />
                        <InvalidInputError>{errors.lastName?.message}</InvalidInputError>
                    </FormRow>
                    <FormRow >
                        <Label className="text-black/70"><RequiredFieldMark />Prenume</Label>
                        <Input {...register("firstName")} />
                        <InvalidInputError>{errors.firstName?.message}</InvalidInputError>
                    </FormRow>
                </FormRow>
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
                <FormRow>
                    <Label className="text-black/70"><RequiredFieldMark />Comfirmare Parola</Label>
                    <Input {...register("cPassword")} type="password" />
                    <InvalidInputError>{errors.cPassword?.message}</InvalidInputError>
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
                    <Text>Ai deja cont? </Text>
                    <Link href="/sign-in" className="text-primary cursor-pointer transition hover:text-blue-900">
                        <TextCTA>Autentifica-te</TextCTA>
                    </Link>
                </FormRow>
                <Text size="sm" className="text-color-secondary pb-2 text-center">
                    Continuand, esti de acord cu Termenii si Politica de Confidentialitate.
                </Text>
            </form>
        </AuthFormCard>
    )
}