import { httpPost } from "../http";
import { api } from "@/app/api/endpoints";

export async function complete() {
  return httpPost(api.onboarding.complete)
}