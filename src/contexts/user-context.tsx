"use client"

import { User } from "@supabase/supabase-js";
import { createContext, useContext } from "react";

type T_UserContext = {
  authUser: User | null | undefined
}

const UserContext = createContext<T_UserContext>({} as any)

type Props = {
  authUser?: User,
  children: React.ReactNode,
}

export const UserProvider: React.FC<Props> = ({ children, authUser }) => {
  return (
    <UserContext.Provider value={{ authUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => useContext(UserContext)