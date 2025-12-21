
import { Card } from "@/components/ui/card"
import { Dot, MessageSquare, X } from "lucide-react"
import { Text } from "@/components/topography"
import { ContractViewSignatures } from "./contract-view-signatures"
import { SignerContractControls } from "./signer-contract-controls"
import { SenderContractControlls } from "./sender-contract-controls"
import { T_ViewContract } from "@/types/services/contracts"

type Props = {
  contract: T_ViewContract,
  isSender?: boolean
}

export const ContractContentView: React.FC<Props> = ({ contract, isSender }) => {
  const contentHtml = contract?.currentVersion?.content?.toString().replace(/<p>(<br\s*\/?>)?<\/p>/g, '<p>&nbsp;</p>');

  return (
    <Card className="p-0 gap-0 max-h-[85vh] overflow-auto">
      <div className="flex flex-row items-center py-3 px-10 bg-input border-b border-black/10">
        <Text size="sm" className="text-color-secondary">Shared securely via link</Text>
        <Dot />
        <Text size="sm" className="text-color-secondary">Expira la {new Date(contract.expiresAt!).toISOString().split("T")[0]}</Text>
      </div>
      <div className="bg-background py-5 px-10 flex items-start justify-between gap-2 border-b-[2px]">
        <div className="flex items-start gap-2">
          <MessageSquare className="size-4 text-primary" />
          <Text size="sm">
            Puteti discuta termenii in sectiunea de comentarii de mai jos.
            Dupa semnare, nu mai sunt permise modificari sau comentarii.
          </Text>
        </div>
        <X size={16} className="hover:opacity-70 transition cursor-pointer" />
      </div>

      <div className="py-3 px-10 overflow-y-auto border-b-[2px]">
        <div className="break-words whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: contentHtml as any }} />
        <ContractViewSignatures contract={contract} />
      </div>
      <div className="px-10 py-4 flex justify-end gap-2">
        {isSender
          ? <SenderContractControlls contract={contract} />
          : <SignerContractControls contract={contract} />
        }
      </div>
    </Card>
  )
}