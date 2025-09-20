import { createClient } from "@/lib/supabase/server";
import { CustomApiResponse, Status } from "@/types/api-call";
import { Signature } from "@prisma/client";

export async function CreateSignature({
  userId,
  type = "DRAW",
  title,
  imageUrl,
}: Partial<Signature>): Promise<CustomApiResponse> {
  const supabase = await createClient();

  try {
    const { error } = await supabase.from("signatures").insert({
      type,
      title,
      imageUrl,
      userId,
      createdAt: new Date()
    })

    if (error) throw error

    return {
      status: Status.SUCCESS,
      data: ""
    };
  } catch (err: any) {
    const errMessage = `${err.message}`;
    console.log(errMessage);
    return {
      status: Status.FAILED,
      error: errMessage
    };
  }
}