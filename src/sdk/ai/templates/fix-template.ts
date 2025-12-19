import { api } from "@/app/api/endpoints";
import { httpPost } from "@/sdk/http";
import { T_AiFixTemplateArgs } from "@/types/services/ai/templates";

export async function fixTemplate(fixTemplateBody: T_AiFixTemplateArgs) {
  return httpPost(api.ai.templates.fixTemplate, fixTemplateBody)
}