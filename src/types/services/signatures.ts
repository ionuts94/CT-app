import { SignatureType } from "@prisma/client"

export type T_CreateSignaturePayload = {
  userId?: string,
  type: SignatureType,
  title?: string | null,
  imageUrl: string
}