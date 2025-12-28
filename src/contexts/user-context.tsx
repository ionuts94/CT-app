"use client"

import { User } from "@supabase/supabase-js";
import { createContext, useContext } from "react";
import { T_UserWithCompany } from "@/types/services/users";

type T_UserContext = {
  authUser: User | null | undefined,
  user: T_UserWithCompany | null | undefined
}

const UserContext = createContext<T_UserContext>({} as any)

type Props = {
  authUser?: User,
  user?: T_UserWithCompany
  children: React.ReactNode,
}

export const UserProvider: React.FC<Props> = ({ children, authUser, user }) => {
  return (
    <UserContext.Provider value={{ authUser, user }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext)