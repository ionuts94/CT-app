import { createClient } from "@/lib/supabase/server";
import { CustomApiResponse, Status } from "@/types/api-call";
import { Signature } from "@prisma/client";
import { GetAuthUser } from "../auth";

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

export async function GetSignatures(): Promise<CustomApiResponse<Signature[]>> {
  const supabase = await createClient();

  try {
    const { data: authUser, error: authError } = await GetAuthUser()

    if (authError || !authUser) throw Error(authError || "You are not authorized to perform this action")

    const { data, error } = await supabase.from("signatures").select("*").eq("userId", authUser?.id)

    if (error) throw error

    return {
      status: Status.SUCCESS,
      data: data
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