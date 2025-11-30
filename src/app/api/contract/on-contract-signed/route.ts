import { api } from "../../endpoints";
import { NextResponse } from "next/server";
import { SendContractSignedNotification } from "@/actions/post/email/contract-state-change-notifications";
import { CustomApiResponse, Status } from "@/types/api-call";
import { UpdateContractSignedPdfUrl } from "@/actions/post/contracts";
import { LogAudit } from "@/actions/post/audit";

export async function POST(req: Request) {
  const { contractId } = await req.json();
  try {
    const response = await fetch(api.contract.generateContractPdf, {
      method: "POST",
      body: JSON.stringify({ contractId })
    })
    const responseJson = await response.json() as CustomApiResponse<{ contractPdfUrl: string }>

    if (responseJson.error || !responseJson.data?.contractPdfUrl) {
      // TODO: Handle error
      // Retry on error
      // Store and retry later
      // Notify admin about the error 
      throw new Error("Failed to generate contract pdf - generate contract url")
    }

    await LogAudit({
      contractId: contractId,
      action: "PDF_GENERATED",
      actorType: "SYSTEM",
      ip: "192.168.1.1",
      userAgent: "Chrome",
      metadata: {},
      contractVersion: 1
    })

    const { error: updateContractUrlError } = await UpdateContractSignedPdfUrl({
      contractId: contractId,
      contractUrl: responseJson.data.contractPdfUrl
    })

    if (updateContractUrlError) {
      // TODO: Handle error
      // Retry on error
      // Store and retry later
      // Notify admin about the error 
      throw new Error("Failed to generate contract pdf - update contract url")
    }

    const { error: notificationsError } = await SendContractSignedNotification({
      contractId: contractId,
      contractUrl: responseJson.data?.contractPdfUrl
    })

    if (notificationsError) {
      // TODO: Handle error
      // Retry on error
      // Store and retry later
      // Notify admin about the error 
      throw new Error("Failed to generate contract pdf - send notifications")
    }

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
