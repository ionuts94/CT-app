import { PreferredTheme } from "@prisma/client"

export const DEFAULT_REDIRECT_AUTH_ROUTE = "/contracts"
export const DEFAULT_REDIRECT_NOT_AUTH_ROUTE = "/sign-in"


export const DEFAULT_USER_PREFERENCES = {
  showRoleOnSignature: true,
  preferredTheme: "LIGHT" as PreferredTheme,
  emailNotifications: true,
  twoFactorEnabled: false,
  createdAt: new Date(),
  updatedAt: new Date()
}

export const getDefaultUserPreferences = (userId: string) => {
  return ({
    ...DEFAULT_USER_PREFERENCES,
    userId,
    id: ""
  })
}