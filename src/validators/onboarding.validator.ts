import z from "zod"

export const CompanyOnboarding = z.object({
    companyName: z.string().min(1, "Company name is mandatory"),
    companyCui: z.string().optional(),
    companyRegNumber: z.string().optional(),
    companyEmailDomanin: z.string().optional(),
})

export type T_CompanyOnboardingSchema = z.infer<typeof CompanyOnboarding>


export const BrandingOnboarding = z.object({
    primaryColor: z.string(),
    secondaryColor: z.string(),
    accentColor: z.string(),
    logoUrl: z.string()
})

export type T_BrandingOnboardingSchema = z.infer<typeof BrandingOnboarding>


export const SignatureOnboarding = z.object({
    svg: z.string(),
    png: z.string(),
    url: z.string()
})

export type T_SignatureOnboardingSchema = z.infer<typeof SignatureOnboarding>