import { api } from "@/app/api/endpoints";
import { httpPost } from "../http";
import { User } from "@prisma/client";

export async function updateUser(userId: string, payload: Partial<User>) {
  return httpPost(api.users.updateUser, { userId, payload })
}