import { createClient } from "@/lib/supabase/server";
import { T_GetContractCommentsBody } from "@/types/api/contracts";
import { CommentWithUser } from "@/types/services/comments";

export async function getContractComments({ contractId }: T_GetContractCommentsBody): Promise<CommentWithUser[]> {
  const supabase = await createClient()
  const { data, error } = await supabase.from("comments")
    .select("*, user: users(*)")
    .eq("contractId", contractId)
    .order("createdAt", { ascending: false })

  if (error) throw Error("Failed to retrieve comments. Error: " + error.message)
  return data
}