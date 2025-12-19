import { api } from "@/app/api/endpoints";
import { httpPost } from "../http";
import { T_CreateTemplateSchema } from "@/validators/template.validator";

export async function create(createTemplateBody: T_CreateTemplateSchema) {
  return httpPost(api.templates.create, createTemplateBody)
}