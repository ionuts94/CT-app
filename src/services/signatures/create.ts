import { createClient } from "@/lib/supabase/server";
import { T_CreateSignaturePayload } from "@/types/services/signatures";
import { Signature } from "@prisma/client";

export async function createSignature({ type, title, imageUrl, userId }: T_CreateSignaturePayload): Promise<Signature> {
  const supabase = await createClient()
  const { data, error } = await supabase.from("signatures").insert({
    type,
    title,
    imageUrl,
    userId,
    createdAt: new Date()
  })
    .select("*")
    .maybeSingle()

  if (error) throw new Error(error.message)

  return data
}