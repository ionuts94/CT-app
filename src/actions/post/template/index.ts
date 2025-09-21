"use server"

import { createClient } from "@/lib/supabase/server";
import { CustomApiResponse, Status } from "@/types/api-call";
import { T_CreateTemplateSchema } from "@/validators/template.validator";
import { Template } from "@prisma/client";
import { GetAuthUser } from "../auth";

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


export async function GetTemplates(): Promise<CustomApiResponse<Template[]>> {
  const supabase = await createClient();

  try {
    const { data: authUser, error: authError } = await GetAuthUser()

    if (!authUser || authError) throw Error(authError || "You are not authorised to perform this action")

    const { data: templates, error: templatesError } = await supabase.from("templates")
      .select("*")
      .eq("userId", authUser.id)

    if (templatesError) throw Error(templatesError.message)

    return {
      status: Status.SUCCESS,
      data: templates
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


export async function GetTemplateById({
  templateId
}: {
  templateId: string
}): Promise<CustomApiResponse<Template>> {
  const supabase = await createClient();

  try {
    const { data: authUser, error: authError } = await GetAuthUser()

    if (!authUser || authError) throw Error(authError || "You are not authorised to perform this action")

    const { data, error } = await supabase.from("templates")
      .select("*")
      .eq("id", templateId)
      .eq("userId", authUser.id)
      .maybeSingle()

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