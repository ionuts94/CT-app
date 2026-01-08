import { EMAIL_TEMPLATE_IDS } from "@/constants/email-utils";
import { envs } from "@/constants/envs";
import { brevo } from "@/lib/brevo";
import { T_NewCommentNotificationPayload } from "@/types/services/emails";
import { format } from "date-fns";

export async function sendSignerNewCommentNotification({
  contractData,
  commentData
}: T_NewCommentNotificationPayload) {
  const templateId = EMAIL_TEMPLATE_IDS.newSenderCommentNotification

  console.log("Sending  signer notification")

  const message = {
    subject: `${contractData?.company.name} a adaugat un comentariu la contract.`,
    to: [{ email: contractData.receiverEmail }],
    templateId: templateId,
    params: {
      companyLogoUrl: contractData?.company.logoUrl,
      companyName: contractData?.company.name,
      colorPrimary: contractData?.company.colorPrimary,
      receiverName: contractData?.receiverName,
      contractTitle: contractData.title,
      commentContent: commentData.content,
      commentDate: format(commentData.createdAt, "dd.MM.yyyy, HH:mm:ss"),
      viewContractUrl: envs.NEXT_PUBLIC_URL + `/view-contract?t=${contractData.receiverToken}`
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

  console.log("Sending brevo email")

  const response = await brevo.sendTransacEmail(message)
  console.log(response)
}