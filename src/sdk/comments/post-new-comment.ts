import { api } from "@/app/api/endpoints";
import { httpPost } from "../http";
import { T_PostCommentBody } from "@/types/api/comments";

export async function postNewComment(payload: T_PostCommentBody) {
  return httpPost(api.comments.postNewComment, payload)
}