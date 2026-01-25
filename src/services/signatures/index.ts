import { createSignature } from "./create"
import { getUserSignatures } from "./get-auth-user-signatures"

const SignatureService = {
  create: createSignature,
  getUserSignatures,
}

export default SignatureService