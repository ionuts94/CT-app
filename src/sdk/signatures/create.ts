import { api } from "@/app/api/endpoints";
import { httpPost } from "../http";

export async function create({ fileUrl }: { fileUrl: string }) {
  return httpPost(api.signatures.create, { fileUrl })
}