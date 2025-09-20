import { createClient } from "@/lib/supabase/server";
import { CustomApiResponse, Status } from "@/types/api-call";
import { GetAuthUser } from "../auth";
import { Template } from "@prisma/client";

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