import { api } from "@/app/api/endpoints";
import { httpDeleteWithBody } from "../http";

export async function deleteTemplate(deleteTemplateBody: { templateId: string }) {
  return httpDeleteWithBody(api.templates.delete, deleteTemplateBody)
}