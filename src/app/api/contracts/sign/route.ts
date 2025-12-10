import { Status } from "@/types/api-call";
import { NextRequest, NextResponse } from "next/server";
import { extractClientIp } from "../../utils";
import SignatureService from "@/services/signatures";
import AuthService from "@/services/auth";
import ContractService from "@/services/contracts";
import AuditService from "@/services/audit";
import { T_ReceiverSignContractBody } from "@/types/api/contracts";


export async function POST(req: NextRequest) {
  const {
    signatureImageUrl,
    contractId,
    receiverName,
  } = await req.json() as T_ReceiverSignContractBody

  try {
    const { ip, userAgent } = extractClientIp(req)

    const signatureData = await SignatureService.create({
      imageUrl: signatureImageUrl,
      type: "DRAW",
    })

    const contractData = await ContractService.receiverSignContract({
      contractId,
      receiverName,
      receiverSignatureId: signatureData.id
    })

    await AuditService.logAudit({
      contractId: contractId,
      action: "CONTRACT_SIGNED_SIGNER",
      actorType: "SIGNER",
      ip: ip,
      userAgent: userAgent,
      metadata: {},
      contractVersion: contractData.currentVersion.versionNumber,
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
