"use server"

import { createClient } from "@/lib/supabase/server";
import { CustomApiResponse, Status } from "@/types/api-call";
import { GetAuthUser } from "../auth";
import { UserTemplateCategory } from "@prisma/client";

export async function GetUserTemplatesCategories(): Promise<CustomApiResponse<{ category: string }[]>> {
  const supabase = await createClient();

  try {
    const { data: authUser, error: authError } = await GetAuthUser()

    if (!authUser || authError) throw Error(authError || "You are not authorised to perform this action")

    const { data: templatesCategories, error: templatesError } = await supabase.from("templates")
      .select("category")
      .eq("userId", authUser.id)

    if (templatesError) throw Error(templatesError.message)

    return {
      status: Status.SUCCESS,
      data: templatesCategories
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


// TODO: For now we pick the easier approach (no need for this table yet)
export async function HandleUserTemplatesCategory({
  category,
  userId,
}: {
  category: string,
  userId: string
}): Promise<CustomApiResponse> {
  const supabase = await createClient();

  try {
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