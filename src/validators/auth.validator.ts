import { z } from "zod"

export const SignUpSchema = z.object({
    email: z
        .string()
        .email("Adresa de email nu este validă")
        .min(1, "Emailul este obligatoriu"),
    firstName: z
        .string()
        .min(1, "Prenumele este obligatoriu"),
    lastName: z
        .string()
        .min(1, "Prenumele este obligatoriu"),
    company: z
        .string()
        .min(1, "Numele companiei este obligatoriu"),
    password: z
        .string()
        .min(6, "Parola trebuie să aibă minim 6 caractere"),
    cPassword: z
        .string()
        .min(6, "Confirmarea parolei este obligatorie"),
}).refine((data) => data.password === data.cPassword, {
    path: ["cPassword"],
    message: "Parolele nu coincid",
})

export type T_SignUpSchema = z.infer<typeof SignUpSchema>

export const LoginSchema = z.object({
    email: z
        .string()
        .email("Adresa de email nu este validă")
        .min(1, "Emailul este obligatoriu"),
    password: z
        .string()
        .min(1, "Parola este obligatorie"),
})

export type T_LoginSchema = z.infer<typeof LoginSchema>


export const ForgotPasswordSchema = z.object({
    email: z
        .string()
        .email("Adresa de email nu este validă")
        .min(1, "Emailul este obligatoriu"),
})

export type T_ForgotPasswordSchema = z.infer<typeof ForgotPasswordSchema>

export const ResetPasswordSchema = z.object({
    password: z
        .string()
        .min(6, "Parola trebuie să aibă minim 6 caractere"),
    cPassword: z
        .string()
        .min(6, "Confirmarea parolei este obligatorie"),
}).refine((data) => data.password === data.cPassword, {
    path: ["cPassword"],
    message: "Parolele nu coincid",
})

export type T_ResetPasswordSchema = z.infer<typeof ResetPasswordSchema>
