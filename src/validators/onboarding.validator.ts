import z from "zod"

export const CompanyOnboarding = z.object({
    companyName: z
        .string()
        .min(1, "Numele companiei este obligatoriu"),
    companyCui: z
        .string()
        .min(1, "CUI-ul companiei este obligatoriu"),
    companyRegNumber: z
        .string()
        .optional(),
    compnayEmailDomain: z
        .string()
        .optional(),
})

export type T_CompanyOnboardingSchema = z.infer<typeof CompanyOnboarding>