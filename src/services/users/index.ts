import { createUserRecord } from "./create-user-record"
import { getUserWithCompany } from "./get-user-with-company"
import { getCurrentUserWithSubscription } from "./get-current-user-with-subscription"
import { updateUser } from "./update-user"

const UserService = {
  createUserRecord,
  getUserWithCompany,
  getCurrentUserWithSubscription,
  updateUser,
}

export default UserService