import { NextResponse } from "next/server";
import { Status } from "@/types/api-call";
import ContractService from "@/services/contracts";
import AuditService from "@/services/audit";
import EmailService from "@/services/emails";

export async function POST(req: Request) {
  const { contractId } = await req.json();
  try {
    const { contractPdfUrl } = await ContractService.generatePdf({ contractId })
    const contractData = await ContractService.updateContractPdfUrl({ contractId, pdfUrl: contractPdfUrl })

    await AuditService.logAudit({
      contractId: contractId,
      action: "PDF_GENERATED",
      actorType: "SYSTEM",
      ip: "SYSTEM",
      userAgent: "SERVER",
      metadata: {},
      contractVersion: contractData.currentVersion.versionNumber
    })

    const { templateId } = await EmailService.sendContractSignedNotifications({
      contractId,
      pdfUrl: contractPdfUrl
    })

    await AuditService.logAudit({
      contractId: contractId,
      action: "CONTRACT_SIGNED_NOTIFICATION_SENT",
      actorType: "SYSTEM",
      ip: "SYSTEM",
      userAgent: "SERVER",
      metadata: { templateId },
      contractVersion: contractData.currentVersion.versionNumber
    })

    return NextResponse.json({
      status: Status.SUCCESS,
      data: ""
    });
  } catch (error: any) {
    return NextResponse.json({
      status: Status.FAILED,
      error: error.message
    });
  }
}
