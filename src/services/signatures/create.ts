import { createClient } from "@/lib/supabase/server";
import { T_CreateSignaturePayload } from "@/types/services/signatures";
import { Signature } from "@prisma/client";

export async function createSignature({ type, title, imageUrl, userId, isMainSignature }: T_CreateSignaturePayload): Promise<Signature> {
  console.log("Creating signature for user")
  console.log(userId)

  const supabase = await createClient()
  const { data, error } = await supabase.from("signatures").insert({
    type,
    title,
    imageUrl,
    userId,
    createdAt: new Date(),
    isMainSignature: isMainSignature || false
  })
    .select("*")
    .maybeSingle()

  if (error) throw new Error(error.message)

  return data
}