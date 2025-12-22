export type T_SingInWithPasswordPayload = {
  email: string,
  password: string
}

export type T_SingUpWithPasswordPayload = {
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  cPassword: string
}

export type T_OTPOperationPayload = {
  email: string,
  token: string
}