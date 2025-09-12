
export const ONBOARDING_STEPS = [
  { name: "company", title: "Company", canSkip: false },
  { name: "branding", title: "Branding", canSkip: true },
  { name: "signature", title: "Signature", canSkip: false },
  { name: "done", title: "Done", canSkip: false },
] as const

export type T_StepItem = typeof ONBOARDING_STEPS[number]
export type T_StepName = typeof ONBOARDING_STEPS[number]["name"]