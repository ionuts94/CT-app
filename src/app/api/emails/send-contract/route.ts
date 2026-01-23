import { NextRequest, NextResponse } from "next/server"
import { Status } from "@/types/api-call"
import { ZodError } from "zod"
import { extractClientIp } from "../../utils"
import ContractService from "@/services/contracts"
import { EMAIL_TEMPLATE_IDS } from "@/constants/email-utils"
import { envs } from "@/constants/envs"
import { brevo } from "@/lib/brevo"
import AuditService from "@/services/audit"
import { ContractStatus } from "@prisma/client"
import { format } from "date-fns"
import { T_SendContractPayload } from "@/validators/contract.validator"
import { dateUtils } from "@/lib/date-utils"
import ContractAllowanceService from "@/services/contract-allowance"
import AuthService from "@/services/auth"

export type T_SendContractEmailBody = T_SendContractPayload & {
  contractId: string
}

export async function POST(req: NextRequest) {
  try {
    const { ip, userAgent } = extractClientIp(req)

    const {
      contractId,
      receiverEmail,
      optionalMessage,
      signingDeadline,
    } = (await req.json()) as T_SendContractEmailBody

    const templateId = EMAIL_TEMPLATE_IDS.sendContract

    const authUser = await AuthService.getAuthUser()
    const contractData = await ContractService.getContractWithCompanyAndOwner({ contractId })

    await ContractAllowanceService.consumeContractAllowance({
      userId: authUser.id,
      contractId
    })

    await ContractService.updateContract({
      ...contractData,
      id: contractData.id,
      status: ContractStatus.OUT_FOR_SIGNATURE,
      lastSentAt: dateUtils
        .toUTC(new Date(), dateUtils.getUserTimeZone())
        .toISOString(),
      receiverEmail,
      signingDeadline,
    })


    await AuditService.logAudit({
      contractId: contractData.id,
      action: "CONTRACT_SENT",
      actorType: "SENDER",
      ip,
      userAgent,
      metadata: {},
      contractVersion: 1,
    })

    const message = {
      subject: `${contractData.company.name} has sent you a contract for signature`,
      to: [{ email: receiverEmail }],
      templateId,
      params: {
        companyLogoUrl: contractData.company.logoUrl,
        companyName: contractData.company.name,
        colorPrimary: contractData.company.colorPrimary,
        colorSecondary: contractData.company.colorSecondary,
        colorAccent: contractData.company.colorAccent,
        contractTitle: contractData.title,
        expiryDate: contractData.expiresAt
          ? format(contractData.expiresAt, "dd.MM.yyyy")
          : "This contract has no expiry date",
        viewContractUrl:
          envs.NEXT_PUBLIC_URL +
          `/view-contract?t=${contractData.receiverToken}`,
        viewContractPassword: contractData.accessPassword,
        receiverEmail,
        optionalMessage,
        signingDeadline: signingDeadline
          ? `${format(signingDeadline, "dd.MM.yyyy")}, 23:59:59`
          : null,
      },
      headers: {
        "X-Mailin-custom":
          "custom_header_1:custom_value_1|custom_header_2:custom_value_2",
        "content-type": "application/json",
        accept: "application/json",
      },
      sender: {
        name: "Contract Transparent",
        email: "support@contracttransparent.ro",
      },
    }

    await brevo.sendTransacEmail(message)


    return NextResponse.json(
      {
        status: Status.SUCCESS,
        data: "",
      },
      { status: 200 }
    )
  } catch (error: any) {
    console.error("Failed to send contract email:", error)

    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          status: Status.FAILED,
          error: error.flatten(),
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        status: Status.FAILED,
        error: error.message || "Internal Server Error",
      },
      { status: 500 }
    )
  }
}
