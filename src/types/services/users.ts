import { User } from "@supabase/supabase-js"
import { Company, Subscription, User as UserData } from "@prisma/client"

export type T_CreateUserPayload = {
  id: string,
  email: string,
  firstName: string,
  lastName: string,
}

export type T_AuthUserWithProfileAndCompany = {
  authUser: User,
  user: T_UserWithCompany
}

export type T_AuthUserWithProfileAndSubscription = {
  authUser: User,
  user: UserData,
  subscription: Subscription
}

export type T_UserWithCompany = UserData & { company: Company }
export type T_UserWithSubscription = UserData & { subscription?: Subscription }