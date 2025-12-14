import { T_SingInWithPasswordBody } from "@/types/api/auth";
import { httpPost } from "../http";
import { api } from "@/app/api/endpoints";

export async function signInWithPassword(payload: T_SingInWithPasswordBody) {
  return httpPost(api.auth.signInWithPassword, payload)
}