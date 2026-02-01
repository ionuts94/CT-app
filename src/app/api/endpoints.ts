import { envs } from "@/constants/envs";

export const api = {
  auth: {
    signInWithPassword: envs.NEXT_PUBLIC_URL + "/api/auth/sign-in-with-password",
    signUpWithPassword: envs.NEXT_PUBLIC_URL + "/api/auth/sign-up-with-password",
    signOut: envs.NEXT_PUBLIC_URL + "/api/auth/sign-out",
    verifyOTP: envs.NEXT_PUBLIC_URL + "/api/auth/verify-otp",
    resendOTP: envs.NEXT_PUBLIC_URL + "/api/auth/resend-otp"
  },
  emails: {
    sendContract: envs.NEXT_PUBLIC_URL + "/api/emails/send-contract"
  },
  eventLog: {
    log: envs.NEXT_PUBLIC_URL + "/api/event-log/log"
  },
  contracts: {
    create: envs.NEXT_PUBLIC_URL + "/api/contracts/create",
    update: envs.NEXT_PUBLIC_URL + "/api/contracts/update",
    get: {
      receiver: envs.NEXT_PUBLIC_URL + "/api/contracts/get/receiver",
      sender: envs.NEXT_PUBLIC_URL + "/api/contracts/get/sender",
    },
    sign: envs.NEXT_PUBLIC_URL + "/api/contracts/sign",
    onContractSigned: envs.NEXT_PUBLIC_URL + "/api/contracts/on-contract-signed",
    decline: envs.NEXT_PUBLIC_URL + "/api/contracts/decline",
    revoke: envs.NEXT_PUBLIC_URL + "/api/contracts/revoke"
  },
  comments: {
    postNewComment: envs.NEXT_PUBLIC_URL + "/api/comments/post-new-comment"
  },
  companies: {
    update: envs.NEXT_PUBLIC_URL + "/api/companies/update"
  },
  templates: {
    create: envs.NEXT_PUBLIC_URL + "/api/templates/create",
    update: envs.NEXT_PUBLIC_URL + "/api/templates/update",
    delete: envs.NEXT_PUBLIC_URL + "/api/templates/delete",
    getAuthUserTemplates: envs.NEXT_PUBLIC_URL + "/api/templates/get-auth-user-templates"
  },
  audit: {
    contractViewed: `${envs.NEXT_PUBLIC_URL}/api/audit/contract-viewed`,
  },
  onboarding: {
    updateState: envs.NEXT_PUBLIC_URL + "/api/onboarding/update-state",
    complete: envs.NEXT_PUBLIC_URL + "/api/onboarding/complete"
  },
  ai: {
    templates: {
      fixTemplate: envs.NEXT_PUBLIC_URL + "/api/ai/templates/fix-template",
      generateTemplate: envs.NEXT_PUBLIC_URL + "/api/ai/templates/generate-template",
      reviewTemplate: envs.NEXT_PUBLIC_URL + "/api/ai/templates/review-template",
    }
  },
  storage: {
    storeFile: envs.NEXT_PUBLIC_URL + "/api/storage/store-file"
  },
  billing: {
    checkout: envs.NEXT_PUBLIC_URL + "/api/billing/checkout",
    changePlan: envs.NEXT_PUBLIC_URL + "/api/billing/change-plan",
    cancelSubscription: envs.NEXT_PUBLIC_URL + "/api/billing/cancel-subscription",
    webhook: envs.NEXT_PUBLIC_URL + "/api/billing/webhook"
  },
  signatures: {
    create: envs.NEXT_PUBLIC_URL + "/api/signatures/create",
    changeMainSignature: envs.NEXT_PUBLIC_URL + "/api/signatures/change-main-signature"
  },
  userPreferences: {
    update: envs.NEXT_PUBLIC_URL + "/api/user-preferences/update"
  },
  users: {
    updateUser: envs.NEXT_PUBLIC_URL + "/api/users/update-user"
  }
} as const