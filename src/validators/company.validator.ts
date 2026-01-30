import z from "zod"

export const CompanySchema = z.object({
    name: z.string().min(1, "Numele companiei este obligatoriu"),
    cui: z.string().min(1, "CUI-ul companiei este obligatoriu"),
    regNumber: z.string().optional(),
    emailDomain: z.string().optional(),

    colorPrimary: z.string(),
    colorSecondary: z.string(),
    colorAccent: z.string(),
    logoUrl: z.string().optional(),
})

export type T_CompanySchema = z.infer<typeof CompanySchema>
