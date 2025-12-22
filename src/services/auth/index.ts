import { getAuthUser } from "./get-auth-user"
import { getUserWithCompany } from "./get-user-with-company"
import { resendOTP } from "./resend-otp"
import { signInWithPassword } from "./sign-in-with-password"
import { signUpWithPassword } from "./sign-up-with-password"
import { verifyOTP } from "./verify-otp"

const AuthService = {
  getUserWithCompany,
  getAuthUser,
  signInWithPassword,
  signUpWithPassword,
  resendOTP,
  verifyOTP,
}

export default AuthService