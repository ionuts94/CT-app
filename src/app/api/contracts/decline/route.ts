import ContractService from "@/services/contracts";
import { Status } from "@/types/api-call";
import { T_FailContractBody } from "@/types/api/contracts";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { extractClientIp } from "../../utils";
import AuditService from "@/services/audit";
import EmailService from "@/services/emails";

export async function POST(req: NextRequest) {
  try {
    const { ip, userAgent } = extractClientIp(req)
    const { contractId, failedReason } = await req.json() as T_FailContractBody

    const contractData = await ContractService.declineContract({ contractId, failedReason })

    await AuditService.logAudit({
      contractId,
      ip,
      userAgent,
      metadata: {},
      action: "CONTRACT_DECLINED",
      actorType: "SIGNER",
      userEmail: contractData.receiverEmail,
      contractVersion: contractData.currentVersion.versionNumber
    })

    await EmailService.sendContractFailedNotifications({ contractId })

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