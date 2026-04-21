import { Card } from "@/components/ui/card"
import { Dot, MessageSquare, X } from "lucide-react"
import { Text } from "@/components/topography"

import { T_ViewContract } from "@/types/services/contracts"
import { ContractViewSignatures } from "../contract-view-signatures"
import { SenderContractControls } from "../sender-contract-controls"
import { SignerContractControls } from "../signer-contract-controls"

type Props = {
  contract: T_ViewContract
  isSender?: boolean
}

export const DesktopContractContentView: React.FC<Props> = ({ contract, isSender }) => {
  const contentHtml = contract?.currentVersion?.content
    ?.toString()
    .replace(/<p>(<br\s*\/?>)?<\/p>/g, "<p>&nbsp;</p>")

  return (
    <Card className="p-0 gap-0 max-h-[85vh] overflow-auto w-full rounded-md">
      {/* Top bar */}
      <div className="px-4 flex flex-row items-center py-3 lg:px-10 bg-input border-b border-black/10">
        <Text size="sm" className="text-color-secondary">
          Securely shared via link
        </Text>
        {contract.expiresAt && (
          <>
            <Dot />
            <Text size="sm" className="text-color-secondary">
              Expires on{" " + new Date(contract.expiresAt).toISOString().split("T")[0]}
            </Text>
          </>
        )}
      </div>

      {/* Info banner */}
      <div className="hidden lg:flex bg-background py-5 px-10 items-start justify-between gap-2 border-b-2">
        <div className="flex items-start gap-2">
          <MessageSquare className="size-4 text-primary" />
          <Text size="sm">
            You can discuss contract terms in the comments section below.
            Once the contract is signed, no further edits or comments are allowed.
          </Text>
        </div>
        <X size={16} className="hover:opacity-70 transition cursor-pointer" />
      </div>

      {/* Contract content */}
      <div className="px-4 py-3 lg:px-10 overflow-y-auto border-b-2">
        <div
          className="wrap-break-word whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: contentHtml as any }}
        />
        <ContractViewSignatures contract={contract} />
      </div>

      {/* Actions */}
      <div className="px-4 lg:px-10 py-4 flex justify-end gap-2">
        {isSender ? (
          <SenderContractControls contract={contract} />
        ) : (
          <SignerContractControls contract={contract} />
        )}
      </div>
    </Card>
  )
}
