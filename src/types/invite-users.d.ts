export interface I_InviteUser {
  token: string,
  first_name: string,
  last_name: string,
  email: string,
  created_by: string,
}

export interface I_UserInvitation extends I_InviteUser {
  onboarding_step: string,
}