import { T_ContractSignedNotificationsPayload } from "@/types/services/emails";
import ContractService from "../contracts";
import { brevo } from "@/lib/brevo";
import { EMAIL_TEMPLATE_IDS } from "@/constants/email-utils";

export async function sendContractSignedNotifications({
  contractId,
  pdfUrl
}: T_ContractSignedNotificationsPayload) {
  const templateId = EMAIL_TEMPLATE_IDS.sendContractSignedNotification

  const contractData = await ContractService.getSenderContract({ contractId })
  const paramsObject = {
    contractTitle: contractData?.title,
    signedDate: new Date(contractData?.receiverSignature?.createdAt!).toLocaleDateString("ro"),
    viewContractUrl: pdfUrl,
  }

  const message = {
    subject: `The contract “${contractData?.title}” has been signed`,
    to: [{ email: contractData?.owner.email }, { email: contractData?.receiverEmail }],
    templateId: templateId,
    params: paramsObject,
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

  await brevo.sendTransacEmail(message)

  return { templateId: templateId }
}