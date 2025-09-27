"use client"

import { T_ViewContract } from "@/actions/post/contracts"
import { Card } from "@/components/ui/card"
import { Dot, MessageSquare } from "lucide-react"
import { Text } from "@/components/topography"
import DOMPurify from "dompurify"
import { PageWidth } from "@/components/layout"
import { ContractViewSignatures } from "./contract-view-signatures"
import { Button } from "@/components/ui/button"
import { UserSignatureDialog } from "./user-signature-dialog"


type Props = {
  contract: T_ViewContract
}

export const ContractContentView: React.FC<Props> = ({ contract }) => {
  const safeContent = DOMPurify.sanitize(contract.content as any)

  return (
    <Card className="p-0  gap-0 max-h-[800px] overflow-auto">
      <div className="flex flex-row items-center py-3 px-10 bg-input border-b border-black/10">
        <Text size="sm" className="text-color-secondary">Shared securely via link</Text>
        <Dot />
        <Text size="sm" className="text-color-secondary">Expira la {new Date(contract.expiresAt!).toLocaleDateString()}</Text>
      </div>
      <div className="bg-background py-5 px-10 flex items-start gap-2 border-b-[2px]">
        <MessageSquare className="size-4 text-primary" />
        <Text size="sm">
          Puteti discuta termenii in sectiunea de comentarii de mai jos.
          Dupa semnare, nu mai sunt permise modificari sau comentarii.
        </Text>
      </div>

      <div className="py-3 px-10 overflow-y-auto border-b-[2px]">
        <div dangerouslySetInnerHTML={{ __html: safeContent as any }} />
        <ContractViewSignatures contract={contract} />
      </div>
      <div className="px-10 py-4 flex justify-end gap-2">
        <Button variant="secondary" className="p-4 px-10">Refuza</Button>
        <UserSignatureDialog contract={contract} />
      </div>
    </Card>
  )
}