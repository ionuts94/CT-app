import { UserPreferences } from "@prisma/client";
import { httpPost } from "../http";
import { api } from "@/app/api/endpoints";

export async function upsertUserPreferences({ userId, payload }: { userId: string, payload: Partial<UserPreferences> }) {
    return httpPost(api.userPreferences.upsert, { userId, payload })
}