import { createClient } from "@/lib/supabase/server";
import { Signature } from "@prisma/client";

export async function getUserSignatures({ userId }: { userId: string }): Promise<T_GetUserSignaturesReturn> {
  const supabase = await createClient()

  if (!userId) throw new Error("Unauthorized. User not signed in.")
  const { data, error } = await supabase.from("signatures").select("*").eq("userId", userId).order("createdAt", { ascending: false })

  if (error) throw new Error(error.message)


  let mainSignature = data[0];
  const otherSignatures = data.filter(item => {
    if (item.isMainSignature) mainSignature = item;
    return !item.isMainSignature
  })

  return {
    mainSignature: mainSignature,
    signatures: otherSignatures,
    allSignatures: data
  }
}

type T_GetUserSignaturesReturn = {
  mainSignature: Signature,
  signatures: Signature[],
  allSignatures: Signature[]
}