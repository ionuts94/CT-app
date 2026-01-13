import { SubscriptionPlan } from "@prisma/client"

export const FEATURES = {
  AUDIT_LOG: "Jurnal de audit și istoric complet al contractelor",
  EMAIL_REMINDERS: "Notificări și remindere automate pe email",
  AI_ASSISTANT: "Asistent AI pentru înțelegerea contractelor",
  TEMPLATES: "Șabloane reutilizabile de contracte",
  UNLIMITED_STORAGE: "Arhivare sigură și acces nelimitat la contracte",
  PRIORITY_SUPPORT: "Suport prioritar",
} as const

export type FeatureKey = keyof typeof FEATURES

export const PLANS_AND_DETAILS = {
  FREE: {
    label: "Free",
    type: "free",
    price: 0,
    currency: "EUR",
    contracts: {
      count: 3,
      period: undefined,
      expires: false, // one-time
    },
    features: [
      "AUDIT_LOG",
      "EMAIL_REMINDERS",
      "TEMPLATES",
      "AI_ASSISTANT",
    ] satisfies FeatureKey[],
  },

  PAYG: {
    label: "Pay as you go",
    type: "one_time",
    price: 5,
    currency: "EUR",
    contracts: {
      count: 1,
      period: undefined
    },
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
    label: "Starter",
    type: "subscription",
    price: 15,
    currency: "EUR",
    billingPeriod: "monthly",
    contracts: {
      count: 5,
      period: "lună"
    },
    stripePriceId: "price_xxx",
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
    label: "Team",
    type: "subscription",
    price: 30,
    currency: "EUR",
    billingPeriod: "monthly",
    contracts: {
      count: 20,
      period: "lună"
    },
    stripePriceId: "price_xxx",
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
    label: "Business",
    type: "subscription",
    price: 50,
    currency: "EUR",
    billingPeriod: "monthly",
    contracts: {
      count: 50,
      period: "lună"
    },
    stripePriceId: "price_xxx",
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

export const getPlanDetailsByPlanId = (planId?: keyof typeof PLANS_AND_DETAILS) => {
  if (!planId) return undefined;
  return PLANS_AND_DETAILS[planId]
}