import { httpPost } from "../http";
import { api } from "@/app/api/endpoints";

export async function resendOTP(body: { email: string }) {
  return httpPost(api.auth.resendOTP, body)
}