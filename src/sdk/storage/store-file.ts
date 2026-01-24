import { T_StoreFileBody } from "@/types/api/storage";
import { api } from "@/app/api/endpoints";

export async function storeFile({
  file,
  filePath,
  bucket,
  contentType,
}: T_StoreFileBody): Promise<{ data: { fileUrl: string } }> {
  const formData = new FormData()

  formData.append("file", file)
  formData.append("filePath", filePath)
  formData.append("bucket", bucket)
  if (contentType) {
    formData.append("contentType", contentType)
  }

  const res = await fetch(api.storage.storeFile, {
    method: "POST",
    body: formData,
  })

  return res.json()
}
