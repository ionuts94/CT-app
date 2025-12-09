import { NextRequest, NextResponse } from "next/server";
import { extractClientIp } from "@/app/api/utils";
import AuditService from "@/services/audit";

export async function POST(req: NextRequest) {
  try {
    const { contractId, actorType } = await req.json();
    const { ip, userAgent } = extractClientIp(req);

    await AuditService.logAudit({
      contractId,
      action: "CONTRACT_VIEWED",
      actorType,
      ip,
      userAgent,
      metadata: {},
    });

    return NextResponse.json({ status: "SUCCESS" });
  } catch (error: any) {
    return NextResponse.json(
      { status: "FAILED", error: error.message },
      { status: 500 }
    );
  }
}
