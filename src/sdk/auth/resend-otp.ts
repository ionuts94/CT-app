import { T_OTPOperationPayload } from "@/types/services/auth";
import { httpPost } from "../http";
import { api } from "@/app/api/endpoints";

export async function resendOTP(body: T_OTPOperationPayload) {
  return httpPost(api.auth.resendOTP, body)
}