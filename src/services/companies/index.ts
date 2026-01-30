import { createCompany } from "./create-company"
import { getCompanyForUser } from "./get-company-for-user"
import { updateCompany } from "./update-company"

const CompanyService = {
  createCompany,
  getCompanyForUser,
  updateCompany
}

export default CompanyService