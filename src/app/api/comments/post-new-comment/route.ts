import AuditService from "@/services/audit";
import CommentService from "@/services/comments";
import { T_PostCommentBody } from "@/types/api/comments";
import { NextRequest, NextResponse } from "next/server";
import { extractClientIp } from "../../utils";
import { Status } from "@/types/api-call";
import EmailService from "@/services/emails";

export async function POST(req: NextRequest) {
  try {
    const { ip, userAgent } = extractClientIp(req)
    const body = await req.json() as T_PostCommentBody
    const comment = await CommentService.postComment(body)

    await AuditService.logAudit({
      action: "COMMENT_ADDED",
      actorType: body.partyRole,
      contractId: body.contractId,
      ip: ip,
      userAgent: userAgent,
      userEmail: body.email,
      userId: body.userId,
      contractVersion: undefined
    })

    await EmailService.sendContractNewCommentNotification({
      contractId: body.contractId,
      commentId: comment.id
    })

    return NextResponse.json({
      status: Status.SUCCESS,
      data: ""
    })
  } catch (err: any) {
    console.log("Failed to post comment. Error: " + err.message)
    return NextResponse.json({
      status: Status.FAILED,
      error: err.message
    })
  }
}