import { UserSignatureDialog } from "./dialogs/user-signature-dialog"
import { Text } from "@/components/topography"
import { getContractStatusOptions } from "@/components/status-badge"
import { cn } from "@/lib/utils"
import { UserContractDeclineDialog } from "./dialogs/user-contract-decline-dialog"
import { T_ViewContract } from "@/types/services/contracts"
import { Fragment } from "react/jsx-runtime"

type Props = {
  contract: T_ViewContract
}

export const SignerContractControls: React.FC<Props> = ({ contract }) => {
  if (contract.status === "FULLY_SIGNED") {
    return contract?.receiverSignature?.createdAt
      ? (
        <Text>
          The contract was signed on{" "}
          <span className="bg-muted/60 p-2 rounded">
            {new Date(contract?.receiverSignature?.createdAt).toLocaleString("en-GB")}
          </span>
        </Text>
      )
      : (
        <Text>
          The contract has been signed and can no longer be modified.
        </Text>
      )
  }

  if (contract.status === "DECLINED") {
    const status = getContractStatusOptions(contract.status)
    return (
      <Text className={cn("p-2 rounded", status.colors)}>
        The contract was declined by the recipient and can no longer be used or modified.
      </Text>
    )
  }

  if (contract.status === "REVOKED") {
    const status = getContractStatusOptions(contract.status)
    return (
      <Text className={cn("p-2 rounded", status.colors)}>
        The company has revoked this contract. It can no longer be modified.
      </Text>
    )
  }

  return (
    <div className="flex w-full flex-col gap-2 lg:flex-row lg:justify-end">
      <UserContractDeclineDialog contract={contract} />
      <UserSignatureDialog contract={contract} />
    </div>
  )
}
