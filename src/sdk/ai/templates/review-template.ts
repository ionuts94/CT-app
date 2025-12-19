import { api } from "@/app/api/endpoints";
import { httpPost } from "@/sdk/http";
import { T_AITemplateReviewInputs } from "@/types/services/ai/templates";

export async function reviewTemplate(reviewTemplateBody: T_AITemplateReviewInputs) {
  return httpPost(api.ai.templates.reviewTemplate, reviewTemplateBody)
}