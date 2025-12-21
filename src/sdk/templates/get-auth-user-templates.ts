import { api } from "@/app/api/endpoints";
import { httpGet } from "../http";
import { Template } from "@prisma/client";

export async function getAuthUserTemplates({ category }: { category?: string }) {
  return httpGet<Template[]>(api.templates.getAuthUserTemplates, { category })
}