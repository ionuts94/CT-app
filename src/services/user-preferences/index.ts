import { getUserPreferences } from "./get-user-preferences"
import { toggleShowRoleOnSignature } from "./toggle-show-role-on-signature"
import { updateUserPreferences } from "./update-user-preferences"

const UserPreferenceService = {
  toggleShowRoleOnSignature,
  getUserPreferences,
  updateUserPreferences
}

export default UserPreferenceService