import { CustomApiResponse, Status } from "@/types/api-call"
import { T_NewCommentNotificationArgs } from "./contract-comment-notifications"
import { EMAIL_TEMPLATE_IDS } from "./constants"
import { FreeGetViewContract, GetContractWithCompanyAndOwner } from "../contracts"
import { brevo } from "@/lib/brevo"
import { envs } from "@/constants/envs"

type T_ContractSignedNotificationArgs = {
  contractId: string,
  contractUrl: string
}

export async function SendContractSignedNotification({
  contractId,
  contractUrl,
}: T_ContractSignedNotificationArgs): Promise<CustomApiResponse<{ templateId: number }>> {
  const templateId = EMAIL_TEMPLATE_IDS.sendContractSignedNotification
  try {
    const { data: contractData, error } = await FreeGetViewContract({ contractId })

    const paramsObject = {
      contractTitle: contractData?.title,
      signedDate: new Date(contractData?.receiverSignature?.createdAt!).toLocaleDateString("ro"),
      viewContractUrl: contractUrl,
    }

    const message = {
      subject: `Contractul, ${contractData?.title}, a fost semnat. `,
      to: [{ email: contractData?.owner.email }, { email: contractData?.reciverEmail }],
      templateId: templateId,
      params: paramsObject,
      headers: {
        'X-Mailin-custom': 'custom_header_1:custom_value_1|custom_header_2:custom_value_2',
        'content-type': 'application/json',
        'accept': 'application/json'
      },
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