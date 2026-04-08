import z from "zod"

export const CompanySchema = z.object({
    name: z.string().min(1, "Company name is mandatory"),
    cui: z.string().optional(),
    regNumber: z.string().optional(),
    emailDomain: z.string().optional(),

    colorPrimary: z.string(),
    colorSecondary: z.string(),
    colorAccent: z.string(),
    logoUrl: z.string().optional(),
})

export type T_CompanySchema = z.infer<typeof CompanySchema>
