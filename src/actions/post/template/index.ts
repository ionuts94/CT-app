"use server"

import { GetAuthUser } from "@/actions/get/auth";
import { createClient } from "@/lib/supabase/server";
import { CustomApiResponse, Status } from "@/types/api-call";
import { T_CreateTemplateSchema } from "@/validators/template.validator";

export async function CreateTemplate({
  title,
  category,
  content
}: T_CreateTemplateSchema): Promise<CustomApiResponse> {
  const supabase = await createClient();

  try {
    const { data: authUser, error: authError } = await GetAuthUser()
    const { data, error } = await supabase.from("templates").insert({
      userId: authUser?.id!,
      title,
      category,
      content,
      createdAt: new Date()
    })

    return {
      status: Status.SUCCESS,
      data: ""
    };
  } catch (err: any) {
    const errMessage = `Failed saving template. Error: ${err.message}`;
    console.log(errMessage);
    return {
      status: Status.FAILED,
      error: errMessage
    };
  }
}