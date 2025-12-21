import { create } from "./create"
import { deleteTemplate } from "./delete-template"
import { getAuthUserTemplates } from "./get-auth-user-templates"
import { update } from "./update"

const CTTemplate = {
  create,
  update,
  deleteTemplate,
  getAuthUserTemplates
}

export default CTTemplate