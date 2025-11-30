"use server"

import { brevo } from "@/lib/brevo";
import { CustomApiResponse, Status } from "@/types/api-call";
import { EMAIL_TEMPLATE_IDS } from "./constants";
import { GetContractWithCompanyAndOwner } from "../contracts";
import { envs } from "@/constants/envs";
import { LogAudit } from "../audit";

export type T_SendContractArgs = {
  contractId: string,
  receiverEmail: string,
  optionalMessage: string,
}

export async function SendContractEmail({
  contractId,
  receiverEmail,
  optionalMessage,
}: T_SendContractArgs): Promise<CustomApiResponse<{ templateId: number }>> {
  const templateId = EMAIL_TEMPLATE_IDS.sendContract
  try {
    const { data: contractData, error: contractError } = await GetContractWithCompanyAndOwner({ contractId })

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

    console.log("Sending brevo email")

    const response = await brevo.sendTransacEmail(message)
    console.log(response)

    await LogAudit({
      contractId: contractData?.id!,
      action: "CONTRACT_SENT",
      actorType: "SENDER",
      ip: "192.168.1.1",
      userAgent: "Chrome",
      metadata: {},
      contractVersion: 1
    })


    return {
      status: Status.SUCCESS,
      data: {
        templateId
      }
    };
  } catch (err: any) {
    const errMessage = `${err.message}`;
    console.log(errMessage);
    return {
      status: Status.FAILED,
      error: errMessage
    };
  }
}