import { T_OTPOperationPayload } from "@/types/services/auth";
import { httpPost } from "../http";
import { api } from "@/app/api/endpoints";

export async function verifyOTP(body: T_OTPOperationPayload) {
  return httpPost(api.auth.verifyOTP, body)
}