import { createClient } from "@/lib/supabase/server";
import { T_StoreFilePayload } from "@/types/services/storage";

export async function storeFile({
  file,
  filePath,
  bucket,
  contentType = "image/jpeg"
}: T_StoreFilePayload): Promise<{ fileUrl: string }> {
  const supabase = await createClient();

  const { error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, { contentType })

  if (error) throw new Error(error.message)

  const response = supabase.storage.from(bucket).getPublicUrl(filePath)
  return ({
    fileUrl: response.data.publicUrl
  })
}