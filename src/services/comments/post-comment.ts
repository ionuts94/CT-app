import { createClient } from "@/lib/supabase/server";
import { T_PostCommentPayload } from "@/types/services/comments";
import { Comment } from "@prisma/client";

export async function postComment({
  content,
  userId,
  contractId,
  partyRole,
  firstName,
  lastName,
  email,
}: T_PostCommentPayload): Promise<Comment> {
  const supabase = await createClient()

  const { data, error } = await supabase.from("comments").insert({
    content,
    userId,
    contractId,
    partyRole,
    firstName,
    lastName
  })
    .select(`*`)
    .maybeSingle()

  if (error) throw new Error(error.message)
  return data
}