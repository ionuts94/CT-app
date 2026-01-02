import { ContractStatus } from "@prisma/client";
import z from "zod";

export const CreateContractSchema = z.object({
    title: z
        .string()
        .min(5, "Titlul contractului trebuie să conțină cel puțin 5 caractere."),

    content: z
        .string()
        .min(50, "Conținutul contractului trebuie să fie suficient de detaliat (minim 50 de caractere)."),

    ownerSignatureId: z
        .string()
        .uuid("A apărut o problemă tehnică. Dacă eroarea persistă, te rugăm să ne contactezi."),

    receiverName: z
        .string()
        .min(2, "Numele destinatarului trebuie să conțină cel puțin 2 caractere."),

    receiverEmail: z
        .string()
        .email("Adresa de email a destinatarului nu este validă."),

    expiresAt: z
        .string()
        .optional(),

    contractStatus: z.nativeEnum(ContractStatus),
})

export type T_CreateContractPayload = z.infer<typeof CreateContractSchema>
