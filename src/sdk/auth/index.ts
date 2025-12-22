
import { resendOTP } from "./resend-otp";
import { signInWithPassword } from "./sign-in-with-password";
import { signUpWithPassword } from "./sign-up-with-password";
import { verifyOTP } from "./verify-otp";

const CTAuth = {
  signInWithPassword,
  signUpWithPassword,
  verifyOTP,
  resendOTP,
}

export default CTAuth