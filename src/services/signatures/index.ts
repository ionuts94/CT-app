import { createSignature } from "./create"
import { getAuthUserSignatures } from "./get-auth-user-signatures"

const SignatureService = {
  create: createSignature,
  getAuthUserSignatures,
}

export default SignatureService