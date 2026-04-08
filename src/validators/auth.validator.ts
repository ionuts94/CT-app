import { z } from "zod"

export const SignUpSchema = z.object({
    email: z.string().email("Invalid email address").min(1, "Email is mandatory"),
    firstName: z.string().min(1, "First name is mandatory"),
    lastName: z.string().min(1, "Last name is mandatory"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    cPassword: z.string().min(6, "Password confirmation is mandatory"),
}).refine((data) => data.password === data.cPassword, {
    path: ["cPassword"],
    message: "Passwords do not match",
})

export type T_SignUpSchema = z.infer<typeof SignUpSchema>

export const LoginSchema = z.object({
    email: z.string().email("Invalid email address").min(1, "Email is mandatory"),
    password: z.string().min(1, "Password is mandatory"),
})

export type T_LoginSchema = z.infer<typeof LoginSchema>


export const ForgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address").min(1, "Email is mandatory"),
})

export type T_ForgotPasswordSchema = z.infer<typeof ForgotPasswordSchema>

export const ResetPasswordSchema = z.object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    cPassword: z.string().min(6, "Password confirmation is mandatory"),
}).refine((data) => data.password === data.cPassword, {
    path: ["cPassword"],
    message: "Passwords do not match",
})

export type T_ResetPasswordSchema = z.infer<typeof ResetPasswordSchema>
