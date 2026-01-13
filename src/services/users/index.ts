import { createUserRecord } from "./create-user-record"
import { getCurrentUserWithCompany } from "./get-current-user-with-company"
import { getCurrentUserWithSubscription } from "./get-current-user-with-subscription"
import { updateUser } from "./update-user"

const UserService = {
  createUserRecord,
  getCurrentUserWithCompany,
  getCurrentUserWithSubscription,
  updateUser,
}

export default UserService