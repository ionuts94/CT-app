"use server"
import { createClient } from "@/lib/supabase/server";
import { CustomApiResponse, Status } from "@/types/api-call";
import { Comment, PartyRole } from "@prisma/client";
import { SendContractNewCommentNotification } from "../email/contract-comment-notifications";
import { LogAudit } from "../audit";

export async function PostContractComment({
  content,
  userId,
  contractId,
  partyRole,
  firstName,
  lastName,
  email,
}: {
  content: string,
  userId?: string,
  contractId: string,
  partyRole: PartyRole,
  firstName: string,
  lastName: string,
  email?: string
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

    await LogAudit({
      contractId: contractId,
      action: "COMMENT_ADDED",
      actorType: partyRole,
      ip: "192.168.1.1",
      userAgent: "Chrome",
      metadata: {},
      contractVersion: 1,
      userEmail: email
    })

    await SendContractNewCommentNotification({ contractId, commentId: data.id })

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
}): Promise<CustomApiResponse<Comment[]>> {
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