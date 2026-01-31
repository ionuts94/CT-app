import ContractService from "../contracts";
import { brevo } from "@/lib/brevo";
import { EMAIL_TEMPLATE_IDS } from "@/constants/email-utils";
import { format } from "date-fns";

export async function sendContractFailedNotifications({
  contractId
}: {
  contractId: string
}) {
  const templateId = EMAIL_TEMPLATE_IDS.sendContractFailedNotification

  const contractData = await ContractService.getSenderContract({ contractId })
  const paramsObject = {
    contractTitle: contractData?.title,
    action: contractData.status === "DECLINED" ? "declined" : "revoked",
    actorName: contractData.status === "DECLINED" ? contractData.receiverName : contractData.owner.firstName + " " + contractData.owner.lastName,
    failedReason: contractData.failedReason,
    timestamp: format(contractData.failedAt, "dd.MM.yyyy, HH:mm:ss"),
  }

  const message = {
    subject: `Contract ${contractData.status === "DECLINED" ? "respins" : "retras"} - ${contractData?.title}.`,
    to: [{ email: contractData?.owner.email }, { email: contractData?.receiverEmail }],
    templateId: templateId,
    params: paramsObject,
    headers: {
      'X-Mailin-custom': 'custom_header_1:custom_value_1|custom_header_2:custom_value_2',
      'content-type': 'application/json',
      'accept': 'application/json'
    },
    sender: {
      name: "Pactly",
      email: "contracts@pactly.co.uk"
    }
  };

  await brevo.sendTransacEmail(message)

  return { templateId: templateId }
}