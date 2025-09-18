"use server"
import { createClient } from "@/lib/supabase/server";
import { CustomApiResponse, Status } from "@/types/api-call";
import { v4 as uuid } from "uuid"


export async function SupabaseStoreFile({
  file,
  filePath,
  bucket,
  contentType = "image/jpeg"
}: {
  file: File,
  filePath: string,
  bucket: string,
  contentType?: string
}): Promise<CustomApiResponse<{ fileUrl: string }>> {
  const supabase = await createClient();

  try {
    const { error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, { contentType })

    if (error) {
      // TODO: Handle error case
    }

    const response = supabase.storage.from(bucket).getPublicUrl(filePath)
    return {
      status: Status.SUCCESS,
      data: { fileUrl: response.data.publicUrl }
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