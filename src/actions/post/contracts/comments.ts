"use server"
import { createClient } from "@/lib/supabase/server";
import { CustomApiResponse, Status } from "@/types/api-call";
import { Comment, PartyRole } from "@prisma/client";
import { SendContractNewCommentNotification } from "../email/contract-comment-notifications";

export async function PostContractComment({
  content,
  userId,
  contractId,
  partyRole,
  firstName,
  lastName,
}: {
  content: string,
  userId?: string,
  contractId: string,
  partyRole: PartyRole,
  firstName: string,
  lastName: string
}): Promise<CustomApiResponse> {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.from("comments").insert({
      content,
      userId,
      contractId,
      partyRole,
      firstName,
      lastName
    })
      .select("*")
      .maybeSingle()

    await SendContractNewCommentNotification({ partyRole, contractId, commentId: data.id })

    if (error) throw Error(error.message)

    return {
      status: Status.SUCCESS,
      data: ""
    };
  } catch (err: any) {
    const errMessage = `Failed to post comment. Error: ${err.message}`;
    console.log(errMessage);
    return {
      status: Status.FAILED,
      error: errMessage
    };
  }
}


export async function GetContractComments({
  contractId
}: {
  contractId: string
}): Promise<CustomApiResponse> {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.from("comments")
      .select("*, user: users(*)")
      .eq("contractId", contractId)
      .order("createdAt", { ascending: false })

    if (error) throw Error("Failed to retrieve comments. Error: " + error.message)
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


export async function GetContractComment({
  commentId
}: {
  commentId: string
}): Promise<CustomApiResponse<Comment>> {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase.from("comments")
      .select("*")
      .eq("id", commentId)
      .maybeSingle()

    if (error) throw new Error("Failed to retrieve contract comment. Error: " + error.message)

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