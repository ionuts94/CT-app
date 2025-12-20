import { T_StoreFileBody } from "@/types/api/storage";
import { httpPost } from "../http";
import { api } from "@/app/api/endpoints";

export async function storeFile(body: T_StoreFileBody) {
  return httpPost(api.storage.storeFile, body)
}