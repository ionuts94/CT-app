import { Button } from "@/components/ui/button"
import { UserSignatureDialog } from "./dialogs/user-signature-dialog"
import { T_ViewContract } from "@/actions/post/contracts"
import { Text } from "@/components/topography"
import { getContractStatusOptions } from "@/components/status-badge"
import { cn } from "@/lib/utils"
import { UserContractDeclineDialog } from "./dialogs/user-contract-decline-dialog"
import { SenderContractRevokeDialog } from "./dialogs/sender-contract-revoke-dialog"

type Props = {
  contract: T_ViewContract
}

export const SenderContractControlls: React.FC<Props> = ({ contract }) => {
  if (contract.status === "FULLY_SIGNED") {
    return contract?.receiverSignature?.createdAt
      ? (
        <Text>
          Contractul a fost semnat la data {" "}
          <span className="bg-muted/60 p-2 rounded">{new Date(contract?.receiverSignature?.createdAt).toLocaleString("ro")}</span>
        </Text>
      )
      : (
        <Text>
          Contractul a fost semnat si nu mai poate fi modificat
        </Text>
      )
  }

  if (contract.status === "DECLINED") {
    const status = getContractStatusOptions(contract.status)
    return <Text className={cn("p-2 rounded", status.colors)}>Contractul a fost respins de catre beneficiar si nu mai poate fi folosit sau modificat.</Text>
  }

  if (contract.status === "REVOKED") {
    const status = getContractStatusOptions(contract.status)
    return <Text className={cn("p-2 rounded", status.colors)}>Compania a retras acest contract. Contractul nu mai poate fi modificat</Text>
  }

  return (
    <>
      <SenderContractRevokeDialog contract={contract} />
      {/* <UserSignatureDialog contract={contract} /> */}
    </>
  )
}