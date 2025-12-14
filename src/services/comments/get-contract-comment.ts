import { createClient } from "@/lib/supabase/server";
import { Comment } from "@prisma/client";

export async function getContractComment({ commentId }: { commentId: string }): Promise<Comment> {
  const supabase = await createClient()
  const { data, error } = await supabase.from("comments")
    .select("*")
    .eq("id", commentId)
    .maybeSingle()

  if (error) throw new Error("Failed to retrieve contract comment. Error: " + error.message)

  return data
}