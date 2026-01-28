import { SubscriptionPlan } from "@prisma/client"
import { envs } from "./envs"

export const FEATURES = {
  AUDIT_LOG: "Full audit log and complete contract history",
  EMAIL_REMINDERS: "Automated email notifications and reminders",
  AI_ASSISTANT: "AI assistant for understanding contracts",
  TEMPLATES: "Reusable contract templates",
  UNLIMITED_STORAGE: "Secure storage with unlimited contract access",
  PRIORITY_SUPPORT: "Priority customer support",
} as const

export type FeatureKey = keyof typeof FEATURES

export type T_PlanDetails = (typeof PLANS_AND_DETAILS)[keyof typeof PLANS_AND_DETAILS]


export const getPlanDetailsByPlanId = (planId?: keyof typeof PLANS_AND_DETAILS) => {
  if (!planId) return PLANS_AND_DETAILS.FREE;
  return PLANS_AND_DETAILS[planId]
}

export const getPlanDetailsByStripePriceId = (priceId: string) => {
  const items = Object.values(PLANS_AND_DETAILS)
  const plan = items.find(item => item.stripePriceId === priceId)
  return plan
}

export const isValidPriceId = (priceId: string) => Boolean(getPlanDetailsByStripePriceId(priceId))

const LIVE_PLANS = {
  FREE: {
    id: SubscriptionPlan.FREE,
    label: "Free",
    type: "free",
    price: 0,
    currency: "GBP",
    contracts: {
      count: 3,
      period: undefined,
      expires: false,
    },
    stripePriceId: null,
    features: [
      "AUDIT_LOG",
      "EMAIL_REMINDERS",
      "TEMPLATES",
      "AI_ASSISTANT",
    ] satisfies FeatureKey[],
  },

  PAYG: {
    id: "PAYG",
    label: "Pay as you go",
    type: "one_time",
    price: 5,
    currency: "GBP",
    contracts: {
      count: 1,
      period: undefined
    },
    stripePriceId: "price_1SuccwCvzVco3QENHIzwUDpL",
    features: [
      "AUDIT_LOG",
      "EMAIL_REMINDERS",
      "TEMPLATES",
      "AI_ASSISTANT",
      "UNLIMITED_STORAGE",
      "PRIORITY_SUPPORT",
    ] satisfies FeatureKey[],
  },

  STARTER: {
    id: SubscriptionPlan.STARTER,
    label: "Starter",
    type: "subscription",
    price: 25,
    currency: "GBP",
    billingPeriod: "monthly",
    contracts: {
      count: 10,
      period: "month"
    },
    stripePriceId: "price_1SucfzCvzVco3QENQQcjGMJJ",
    features: [
      "AUDIT_LOG",
      "EMAIL_REMINDERS",
      "TEMPLATES",
      "AI_ASSISTANT",
      "UNLIMITED_STORAGE",
      "PRIORITY_SUPPORT",
    ] satisfies FeatureKey[],
  },

  TEAM: {
    id: SubscriptionPlan.TEAM,
    label: "Team",
    type: "subscription",
    price: 50,
    currency: "GBP",
    billingPeriod: "monthly",
    contracts: {
      count: 30,
      period: "month"
    },
    stripePriceId: "price_1SucgMCvzVco3QENlHDZFmP5",
    features: [
      "AUDIT_LOG",
      "EMAIL_REMINDERS",
      "TEMPLATES",
      "AI_ASSISTANT",
      "UNLIMITED_STORAGE",
      "PRIORITY_SUPPORT",
    ] satisfies FeatureKey[],
  },

  BUSINESS: {
    id: SubscriptionPlan.BUSINESS,
    label: "Business",
    type: "subscription",
    price: 80,
    currency: "GBP",
    billingPeriod: "monthly",
    contracts: {
      count: 80,
      period: "month"
    },
    stripePriceId: "price_1SucgfCvzVco3QENpLrIWYEH",
    features: [
      "AUDIT_LOG",
      "EMAIL_REMINDERS",
      "TEMPLATES",
      "AI_ASSISTANT",
      "UNLIMITED_STORAGE",
      "PRIORITY_SUPPORT",
    ] satisfies FeatureKey[],
  },
} as const

const TEST_PLANS = {
  FREE: {
    id: SubscriptionPlan.FREE,
    label: "Free",
    type: "free",
    price: 0,
    currency: "EUR",
    contracts: {
      count: 3,
      period: undefined,
      expires: false,
    },
    stripePriceId: null,
    features: [
      "AUDIT_LOG",
      "EMAIL_REMINDERS",
      "TEMPLATES",
      "AI_ASSISTANT",
    ] satisfies FeatureKey[],
  },

  PAYG: {
    id: "PAYG",
    label: "Pay as you go",
    type: "one_time",
    price: 5,
    currency: "EUR",
    contracts: {
      count: 1,
      period: undefined
    },
    stripePriceId: "price_1Sp2Z4CvzVco3QENtupsLLUZ",
    features: [
      "AUDIT_LOG",
      "EMAIL_REMINDERS",
      "TEMPLATES",
      "AI_ASSISTANT",
      "UNLIMITED_STORAGE",
      "PRIORITY_SUPPORT",
    ] satisfies FeatureKey[],
  },

  STARTER: {
    id: SubscriptionPlan.STARTER,
    label: "Starter",
    type: "subscription",
    price: 15,
    currency: "EUR",
    billingPeriod: "monthly",
    contracts: {
      count: 5,
      period: "month"
    },
    stripePriceId: "price_1Sp2X3CvzVco3QENUCGzyQvw",
    features: [
      "AUDIT_LOG",
      "EMAIL_REMINDERS",
      "TEMPLATES",
      "AI_ASSISTANT",
      "UNLIMITED_STORAGE",
      "PRIORITY_SUPPORT",
    ] satisfies FeatureKey[],
  },

  TEAM: {
    id: SubscriptionPlan.TEAM,
    label: "Team",
    type: "subscription",
    price: 30,
    currency: "EUR",
    billingPeriod: "monthly",
    contracts: {
      count: 20,
      period: "month"
    },
    stripePriceId: "price_1Sp2XiCvzVco3QEN2u3Wmd5P",
    features: [
      "AUDIT_LOG",
      "EMAIL_REMINDERS",
      "TEMPLATES",
      "AI_ASSISTANT",
      "UNLIMITED_STORAGE",
      "PRIORITY_SUPPORT",
    ] satisfies FeatureKey[],
  },

  BUSINESS: {
    id: SubscriptionPlan.BUSINESS,
    label: "Business",
    type: "subscription",
    price: 50,
    currency: "EUR",
    billingPeriod: "monthly",
    contracts: {
      count: 50,
      period: "month"
    },
    stripePriceId: "price_1Sp2YVCvzVco3QEN4SAIwF5z",
    features: [
      "AUDIT_LOG",
      "EMAIL_REMINDERS",
      "TEMPLATES",
      "AI_ASSISTANT",
      "UNLIMITED_STORAGE",
      "PRIORITY_SUPPORT",
    ] satisfies FeatureKey[],
  },
} as const

export const PLANS_AND_DETAILS = envs.NEXT_PUBLIC_ENVIRONMENT === "TEST" ? TEST_PLANS : LIVE_PLANS;
