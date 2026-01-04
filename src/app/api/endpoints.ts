import { envs } from "@/constants/envs";
import { reviewTemplate } from "@/services/ai/templates/review-template";

export const api = {
  contract: {
    userSign: envs.NEXT_PUBLIC_URL + "/api/contract/user-sign",
    generateContractPdf: envs.NEXT_PUBLIC_URL + "/api/contract/generate",
    onContractSigned: envs.NEXT_PUBLIC_URL + "/api/contract/on-contract-signed"
  },
  auth: {
    signInWithPassword: envs.NEXT_PUBLIC_URL + "/api/auth/sign-in-with-password",
    signUpWithPassword: envs.NEXT_PUBLIC_URL + "/api/auth/sign-up-with-password",
    signOut: "/api/auth/sign-out",
    verifyOTP: "/api/auth/verify-otp",
    resendOTP: "/api/auth/resend-otp"
  },
  emails: {
    sendContract: envs.NEXT_PUBLIC_URL + "/api/emails/send-contract"
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
  templates: {
    create: "/api/templates/create",
    update: "/api/templates/update",
    delete: "/api/templates/delete",
    getAuthUserTemplates: "/api/templates/get-auth-user-templates"
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
      fixTemplate: "/api/ai/templates/fix-template",
      generateTemplate: "/api/ai/templates/generate-template",
      reviewTemplate: "/api/ai/templates/review-template",
    }
  },
  storage: {
    storeFile: "/api/storage/store-file"
  }
} as const