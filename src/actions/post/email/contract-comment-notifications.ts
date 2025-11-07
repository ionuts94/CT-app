"use server"

import { brevo } from "@/lib/brevo";
import { CustomApiResponse, Status } from "@/types/api-call";
import { EMAIL_TEMPLATE_IDS } from "./constants";
import { GetContractWithCompany, T_ContractWithCompany } from "../contracts";
import { envs } from "@/constants/envs";
import { createClient } from "@/lib/supabase/server";
import { PartyRole } from "@prisma/client";
import { GetContractComment } from "../contracts/comments";


export async function SendContractNewCommentNotification({
  contractId,
  commentId,
}: {
  contractId: string,
  commentId: string
}): Promise<CustomApiResponse> {

  try {
    const [
      { data: contractData, error: contractError },
      { data: commentData, error: commentError }
    ] = await Promise.all([
      GetContractWithCompany({ contractId }),
      GetContractComment({ commentId })
    ])

    switch (commentData?.partyRole) {
      case "SENDER":
        await SendSignerNewCommentNotification({})
        break;
      case "SIGNER":
        await SendSenderNewCommentNotification({})
        break;
      case "SYSTEM":
        await Promise.all([
          SendSignerNewCommentNotification({}),
          SendSenderNewCommentNotification({})
        ])
      default:
        await SendSignerNewCommentNotification({})
    }

    return {
      status: Status.SUCCESS,
      data: ""
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


export type T_NewCommentNotificationArgs = {
  contractData: T_ContractWithCompany,
  commentData: Comment,
}

export async function SendSignerNewCommentNotification({
  contractData,
  commentData,
}: T_NewCommentNotificationArgs): Promise<CustomApiResponse<{ templateId: number }>> {
  const templateId = EMAIL_TEMPLATE_IDS.sendContract
  try {

    const message = {
      subject: `${contractData?.company.name} ți-a trimis un contract spre semnare`,
      to: [{ email: reciverEmail }],
      templateId: templateId,
      params: {
        companyLogoUrl: contractData?.company.logoUrl,
        companyName: contractData?.company.name,
        colorPrimary: contractData?.company.colorPrimary,
        colorSecondary: contractData?.company.colorSecondary,
        colorAccent: contractData?.company.colorAccent,
        contractTitle: contractData?.title,
        expiryDate: contractData?.expiresAt,
        viewContractUrl: envs.NEXT_PUBLIC_URL + `/view-contract/${contractData?.id}`,
        viewContractPassword: contractData?.accessPassword,
        reciverEmail,
        newCommentContent,
      },
      headers: {
        'X-Mailin-custom': 'custom_header_1:custom_value_1|custom_header_2:custom_value_2',
        'content-type': 'application/json',
        'accept': 'application/json'
      }
    };

    console.log("Sending brevo email")

    const response = await brevo.sendTransacEmail(message)
    console.log(response)


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


export async function SendSenderNewCommentNotification({
  contractId,
  commentId,
}: T_NewCommentNotificationArgs): Promise<CustomApiResponse<{ templateId: number }>> {
  const templateId = EMAIL_TEMPLATE_IDS.sendContract
  try {
    const { data: contractData, error: contractError } = await GetContractWithCompany({ contractId })
    const reciverEmail = contractData?.reciverEmail

    const message = {
      subject: `${contractData?.company.name} ți-a trimis un contract spre semnare`,
      to: [{ email: reciverEmail }],
      templateId: templateId,
      params: {
        companyLogoUrl: contractData?.company.logoUrl,
        companyName: contractData?.company.name,
        colorPrimary: contractData?.company.colorPrimary,
        colorSecondary: contractData?.company.colorSecondary,
        colorAccent: contractData?.company.colorAccent,
        contractTitle: contractData?.title,
        expiryDate: contractData?.expiresAt,
        viewContractUrl: envs.NEXT_PUBLIC_URL + `/view-contract/${contractData?.id}`,
        viewContractPassword: contractData?.accessPassword,
        reciverEmail,
        newCommentContent,
      },
      headers: {
        'X-Mailin-custom': 'custom_header_1:custom_value_1|custom_header_2:custom_value_2',
        'content-type': 'application/json',
        'accept': 'application/json'
      }
    };

    console.log("Sending brevo email")

    const response = await brevo.sendTransacEmail(message)
    console.log(response)


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