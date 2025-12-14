import { PartyRole } from "@prisma/client"

export type T_PostCommentBody = {
  content: string,
  userId?: string,
  contractId: string,
  partyRole: PartyRole,
  firstName: string,
  lastName: string,
  email?: string
}