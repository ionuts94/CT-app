"use server"

import { brevo } from "@/lib/brevo";
import { CustomApiResponse, Status } from "@/types/api-call";
import { EMAIL_TEMPLATE_IDS } from "./constants";
import { GetContractWithCompanyAndOwner, T_ContractWithCompanyAndOwner } from "../contracts";
import { envs } from "@/constants/envs";
import { createClient } from "@/lib/supabase/server";
import { PartyRole } from "@prisma/client";
import { GetContractComment } from "../contracts/comments";
import { Comment } from "@prisma/client";


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
      GetContractWithCompanyAndOwner({ contractId }),
      GetContractComment({ commentId })
    ])

    if (contractError || !contractData) throw new Error("")
    if (commentError || !commentData) throw new Error("")

    switch (commentData?.partyRole) {
      case "SENDER":
        await SendSignerNewCommentNotification({ contractData, commentData })
        break;
      case "SIGNER":
        await SendSenderNewCommentNotification({ contractData, commentData })
        break;
      case "SYSTEM":
        await Promise.all([
          SendSignerNewCommentNotification({ contractData, commentData }),
          SendSenderNewCommentNotification({ contractData, commentData })
        ])
      default:
        await SendSignerNewCommentNotification({ contractData, commentData })
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
  contractData: T_ContractWithCompanyAndOwner,
  commentData: Comment,
}

export async function SendSignerNewCommentNotification({
  contractData,
  commentData,
}: T_NewCommentNotificationArgs): Promise<CustomApiResponse<{ templateId: number }>> {
  const templateId = EMAIL_TEMPLATE_IDS.newSenderCommentNotification
  try {

    console.log("Sending  signer notification")

    const message = {
      subject: `${contractData?.company.name} a adaugat un comentariu la contract.`,
      to: [{ email: contractData.reciverEmail }],
      templateId: templateId,
      params: {
        companyLogoUrl: contractData?.company.logoUrl,
        companyName: contractData?.company.name,
        colorPrimary: contractData?.company.colorPrimary,
        receiverName: contractData?.reciverName,
        contractTitle: contractData.title,
        commentContent: commentData.content,
        commentDate: commentData.createdAt,
        viewContractUrl: envs.NEXT_PUBLIC_URL + `/view-contract?c=${contractData.id}`
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
  contractData,
  commentData,
}: T_NewCommentNotificationArgs): Promise<CustomApiResponse<{ templateId: number }>> {
  const templateId = EMAIL_TEMPLATE_IDS.newSignerCommentNotification
  try {

    console.log("Sending  sender notification")
    const paramsObject = {
      companyLogoUrl: contractData?.company.logoUrl,
      companyName: contractData?.company.name,
      colorPrimary: contractData?.company.colorPrimary,
      receiverName: contractData?.reciverName,
      contractTitle: contractData.title,
      commentContent: commentData.content,
      commentDate: new Date(commentData.createdAt).toISOString(),
      viewContractUrl: envs.NEXT_PUBLIC_URL + `/view-contract?c=${contractData.id}`
    }

    console.log(paramsObject)


    const message = {
      subject: `Beneficiarul, ${contractData.reciverName}, a adaugat un comentariu la contract. `,
      to: [{ email: contractData.owner.email }],
      templateId: templateId,
      params: paramsObject,
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