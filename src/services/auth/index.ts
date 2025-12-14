import { getAuthUser } from "./get-auth-user"
import { getUserWithCompany } from "./get-user-with-company"
import { signInWithPassword } from "./sign-in-with-password"
import { signUpWithPassword } from "./sign-up-with-password"

const AuthService = {
  getUserWithCompany,
  getAuthUser,
  signInWithPassword,
  signUpWithPassword
}

export default AuthService