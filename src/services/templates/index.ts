import { create } from "./create"
import { get } from "./get"
import { getTemplateById } from "./get-template-by-id"
import { getUserTemplates } from "./get-user-templates"
import { getUserTemplatesCategories } from "./get-user-templates-categories"
import { deleteTemplate } from "./delete"
import { update } from "./update"

const TemplateService = {
  create,
  update,
  deleteTemplate,
  get,
  getUserTemplates,
  getUserTemplatesCategories,
  getTemplateById
}

export default TemplateService