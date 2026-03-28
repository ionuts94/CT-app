import { getUserPreferences } from "./get-user-preferences"
import { toggleShowRoleOnSignature } from "./toggle-show-role-on-signature"
import { updateUserPreferences } from "./update-user-preferences"
import { upsertUserPreferences } from "./upsert-user-preferences"

const UserPreferenceService = {
  toggleShowRoleOnSignature,
  getUserPreferences,
  updateUserPreferences,
  upsertUserPreferences
}

export default UserPreferenceService