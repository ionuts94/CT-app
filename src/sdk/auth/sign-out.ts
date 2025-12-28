import { httpPost } from "../http";
import { api } from "@/app/api/endpoints";

export async function signOut() {
  return httpPost(api.auth.signOut)
}