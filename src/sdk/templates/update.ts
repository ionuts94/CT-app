import { httpPatch } from "../http";
import { api } from "@/app/api/endpoints";
import { Template } from "@prisma/client";

export async function update(updateTemplateBody: Template) {
  return httpPatch(api.templates.update, updateTemplateBody)
}