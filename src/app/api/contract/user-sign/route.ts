import { LogAudit } from "@/actions/post/audit";
import { ReceiverSignContract } from "@/actions/post/contracts/receivers";
import { CreateSignature } from "@/actions/post/signature";
import { Status } from "@/types/api-call";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const xff = req.headers.get("x-forwarded-for");
    const ip = xff ? xff.split(",")[0].trim() : req.headers.get("x-real-ip") || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    const { data: signatureData, error: signatureCreateError } = await CreateSignature({
      imageUrl: body.signatureImageUrl,
      type: "DRAW",
      createdAt: new Date(),
    })

    if (signatureCreateError) throw Error(signatureCreateError)

    const { error } = await ReceiverSignContract({
      contractId: body.contractId,
      receiverSignatureId: signatureData?.id!,
      receiverName: body.receiverName,
    });

    if (error) throw Error(error)

    await LogAudit({
      contractId: body.contractId,
      action: "CONTRACT_SIGNED_SIGNER",
      actorType: "SIGNER",
      ip: "192.168.1.1",
      userAgent: "Chrome",
      metadata: {},
      contractVersion: 1,
    })

    return NextResponse.json({
      status: Status.SUCCESS,
      data: ""
    });

  } catch (error: any) {
    console.log("Failed signing contract. Error: " + error.message)
    return NextResponse.json({
      status: Status.FAILED,
      error: error.message
    })
  }
}
