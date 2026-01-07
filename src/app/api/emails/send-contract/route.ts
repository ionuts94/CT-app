import { NextRequest, NextResponse } from "next/server";
import { Status } from "@/types/api-call";
import { ZodError } from "zod";
import { extractClientIp } from "../../utils";
import ContractService from "@/services/contracts";
import { EMAIL_TEMPLATE_IDS } from "@/constants/email-utils";
import { envs } from "@/constants/envs";
import { brevo } from "@/lib/brevo";
import AuditService from "@/services/audit";
import { ContractStatus } from "@prisma/client";
import { format } from "date-fns";

export type T_SendContractEmailBody = {
  contractId: string,
  receiverEmail: string,
  optionalMessage: string,
}

export async function POST(req: NextRequest) {
  try {

    const { ip, userAgent } = extractClientIp(req)
    const {
      contractId,
      receiverEmail,
      optionalMessage
    } = await req.json() as T_SendContractEmailBody
    const templateId = EMAIL_TEMPLATE_IDS.sendContract
    const contractData = await ContractService.getContractWithCompanyAndOwner({ contractId })

    await ContractService.updateContract({
      ...contractData,
      id: contractData.id,
      status: ContractStatus.OUT_FOR_SIGNATURE,
      receiverEmail,
    })

    const message = {
      subject: `${contractData?.company.name} ți-a trimis un contract spre semnare`,
      to: [{ email: receiverEmail }],
      templateId: templateId,
      params: {
        companyLogoUrl: contractData?.company.logoUrl,
        companyName: contractData?.company.name,
        colorPrimary: contractData?.company.colorPrimary,
        colorSecondary: contractData?.company.colorSecondary,
        colorAccent: contractData?.company.colorAccent,
        contractTitle: contractData?.title,
        expiryDate: contractData.expiresAt ? format(contractData.expiresAt, "dd.MM.yyyy") : "contractul nu are data de expirare",
        signingDeadline: contractData.signingDeadline ? format(contractData.signingDeadline, "dd.MM.yyyy") + ", 23:59:59" : null,
        viewContractUrl: envs.NEXT_PUBLIC_URL + `/view-contract?t=${contractData?.receiverToken}`,
        viewContractPassword: contractData?.accessPassword,
        receiverEmail,
        optionalMessage,
      },
      headers: {
        'X-Mailin-custom': 'custom_header_1:custom_value_1|custom_header_2:custom_value_2',
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      sender: {
        name: "Contract Transparent",
        email: "support@contracttransparent.ro"
      }
    };

    const response = await brevo.sendTransacEmail(message)

    await AuditService.logAudit({
      contractId: contractData?.id!,
      action: "CONTRACT_SENT",
      actorType: "SENDER",
      ip: ip,
      userAgent: userAgent,
      metadata: {},
      contractVersion: 1
    })

    return NextResponse.json({
      status: Status.SUCCESS,
      data: "",
    }, {
      status: 200
    });
  } catch (error: any) {
    console.log("Filed to send contract email. Error: " + error.message)
    console.log(error)
    // console.log(error.request)
    console.log(error.response)

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
