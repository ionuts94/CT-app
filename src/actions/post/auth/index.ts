"use server"

import { createClient } from "@/lib/supabase/server";
import { CustomApiResponse, Status } from "@/types/api-call";
import { SignUpSchema, T_SignUpSchema } from "@/validators/auth.validator";

export async function SignUp({
    email,
    firstName,
    lastName,
    password,
    cPassword
}: T_SignUpSchema): Promise<CustomApiResponse> {
    const supabase = await createClient();

    try {
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
                emailRedirectTo: process.env.NEXT_PUBLIC_URL + "/api/auth/callback",
                data: {
                    firstName,
                    lastName,
                    onboardingCompleted: false
                }
            },
        })

        if (error) {
            throw Error(error.message)
        }

        return {
            status: Status.SUCCESS,
            data: "success"
        };
    } catch (err: any) {
        const errMessage = `${err.message}`;
        console.log(errMessage);
        return {
            status: Status.FAILED,
            error: errMessage
        };
    }
}


export async function VerifySupabaseCode({
    code
}: {
    code: string
}): Promise<CustomApiResponse> {
    const supabase = createClient();

    try {
        return {
            status: Status.SUCCESS,
            data: ""
        };
    } catch (err: any) {
        const errMessage = `${err.message}`;
        console.log(errMessage);
        return {
            status: Status.FAILED,
            error: errMessage
        };
    }
}