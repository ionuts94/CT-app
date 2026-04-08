import { ContractStatus } from "@prisma/client";
import z from "zod";

export const ContractSchema = z.object({
    title: z
        .string()
        .min(5, "Contract title must be at least 5 characters long."),

    content: z
        .string()
        .min(50, "Contract content must be sufficiently detailed (minimum 50 characters)."),

    ownerSignatureId: z
        .string()
        .uuid("A technical issue occurred. If the error persists, please contact us."),

    receiverName: z
        .string()
        .min(2, "Receiver name must be at least 2 characters long."),

    receiverEmail: z
        .string()
        .email("Receiver email address is not valid."),

    expiresAt: z
        .string()
        .optional(),

    signingDeadline: z
        .string()
        .optional(),

    optionalMessage: z
        .string()
        .optional(),
})

export type T_ContractPayload = z.infer<typeof ContractSchema>


export const SendContractSchema = z.object({
    receiverEmail: z
        .string()
        .email("Receiver email address is not valid."),
    optionalMessage: z
        .string()
        .optional()
    ,
    signingDeadline: z
        .string()
        .optional(),
})

export type T_SendContractPayload = z.infer<typeof SendContractSchema>