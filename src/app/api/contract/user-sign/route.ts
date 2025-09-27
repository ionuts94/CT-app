import { ReceiverSignContract } from "@/actions/post/contracts/receivers";
import { CreateSignature } from "@/actions/post/signature";
import { NextResponse } from "next/server";


export async function POST(req: Request, { params }: { params: { id: string } }) {
  const body = await req.json();

  const xff = req.headers.get("x-forwarded-for");
  const ip = xff ? xff.split(",")[0].trim() : req.headers.get("x-real-ip") || "unknown";
  const userAgent = req.headers.get("user-agent") || "unknown";

  const { } = await CreateSignature({
    imageUrl: body.signatureImageUrl,
    type: "DRAW",
    createdAt: new Date(),
  })

  const { error } = await ReceiverSignContract({
    contractId: params.id,
    receiverSignatureId: body.signatureId,
    receiverName: body.receiverName,
  });

  return NextResponse.json(result);
}
