import { changeMainSignature } from "./change-main-signature"
import { createSignature } from "./create"
import { getUserSignatures } from "./get-auth-user-signatures"

const SignatureService = {
  create: createSignature,
  getUserSignatures,
  changeMainSignature,
}

export default SignatureService