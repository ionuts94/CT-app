import { Comment, PartyRole, User } from "@prisma/client";
import { T_ContractWithVersion } from "./contracts";

export type CommentWithUser = Comment & {
  user: User;
};

export type CommentWithContract = Comment & {
  contract: T_ContractWithVersion
}

export type T_PostCommentPayload = {
  content: string,
  userId?: string,
  contractId: string,
  partyRole: PartyRole,
  firstName: string,
  lastName: string,
  email?: string
}