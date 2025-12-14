import { T_BrandingOnboardingSchema, T_CompanyOnboardingSchema } from "@/validators/onboarding.validator";

export type T_CreateCompanyPayload = T_CompanyOnboardingSchema & T_BrandingOnboardingSchema
