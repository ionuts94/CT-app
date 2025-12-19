import { api } from "@/app/api/endpoints";
import { httpPost } from "@/sdk/http";
import { T_AiTemplateWriteSchema } from "@/validators/template.validator";

export async function generateTemplate(generateTemplateBody: T_AiTemplateWriteSchema) {
  return httpPost(api.ai.templates.generateTemplate, generateTemplateBody)
}