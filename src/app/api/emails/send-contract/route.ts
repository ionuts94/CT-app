import { NextRequest, NextResponse } from "next/server";
import { Status } from "@/types/api-call";
import { ZodError } from "zod";
import { extractClientIp } from "../../utils";
import ContractService from "@/services/contracts";
import { EMAIL_TEMPLATE_IDS } from "@/constants/email-utils";
import { envs } from "@/constants/envs";
import { brevo } from "@/lib/brevo";
import { LogAudit } from "@/actions/post/audit";

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
        expiryDate: contractData?.expiresAt,
        viewContractUrl: envs.NEXT_PUBLIC_URL + `/view-contract?c=${contractData?.id}`,
        viewContractPassword: contractData?.accessPassword,
        receiverEmail,
        optionalMessage,
      },
      headers: {
        'X-Mailin-custom': 'custom_header_1:custom_value_1|custom_header_2:custom_value_2',
        'content-type': 'application/json',
        'accept': 'application/json'
      },
    };

    await brevo.sendTransacEmail(message)

    await ContractService.logAudit({
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
