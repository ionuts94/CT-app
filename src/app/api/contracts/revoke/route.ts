import ContractService from "@/services/contracts";
import AuditService from "@/services/audit";
import { NextRequest, NextResponse } from "next/server";
import { extractClientIp } from "../../utils";
import { Status } from "@/types/api-call";
import EmailService from "@/services/emails";

export async function POST(req: NextRequest) {
  try {
    console.log("Hitting post request")
    const { contractId, failedReason } = await req.json();
    const { ip, userAgent } = extractClientIp(req);

    const contractData = await ContractService.revokeContract({
      contractId,
      failedReason
    });

    await AuditService.logAudit({
      contractId,
      action: "CONTRACT_REVOKED",
      actorType: "SENDER",
      ip,
      userAgent,
      metadata: {},
      userEmail: contractData.owner.email,
      contractVersion: contractData.currentVersion.versionNumber
    });

    await EmailService.sendContractFailedNotifications({ contractId })

    return NextResponse.json({
      status: Status.SUCCESS,
      data: contractData,
    });
  } catch (error: any) {
    return NextResponse.json({
      status: Status.FAILED,
      error: error.message
    }, { status: 500 });
  }
}
