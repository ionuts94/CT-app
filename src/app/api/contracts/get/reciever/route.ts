import { NextRequest, NextResponse } from "next/server";
import { extractClientIp } from "@/app/api/utils";
import ContractService from "@/services/contracts";
import { Status } from "@/types/api-call";
import { ZodError } from "zod";
import { T_GetReceiverContractBody } from "@/types/api/contracts";
import AuditService from "@/services/audit";

export async function POST(req: NextRequest) {
  try {
    const { ip, userAgent } = extractClientIp(req)
    const { receiverToken } = await req.json() as T_GetReceiverContractBody

    const contractData = await ContractService.getReceiverContract({ receiverToken })

    await AuditService.logAudit({
      contractId: contractData.id,
      action: "CONTRACT_VIEWED",
      actorType: "SIGNER",
      ip,
      userAgent,
      contractVersion: 1,
      metadata: {},
      userId: null,
      userEmail: contractData.receiverEmail,
    })

    return NextResponse.json({
      status: Status.SUCCESS,
      data: contractData,
    }, {
      status: 200
    });
  } catch (error: any) {
    // Zod validation error
    if (error instanceof ZodError) {
      return NextResponse.json({
        status: Status.FAILED,
        error: error.flatten(),
      }, {
        status: 400
      });
    }

    // Generic error
    return NextResponse.json({
      status: Status.FAILED,
      error: error.message || "Internal Server Error",
    }, {
      status: 500
    });
  }
}