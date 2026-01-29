"use client"

import { SignatureItem } from "@/components/signature-item"
import { Text } from "@/components/topography"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useDialog } from "@/hooks/use-dialog"
import { Signature as SignatureType } from "@prisma/client"
import { Signature } from "lucide-react"

type Props = {
  currentSignatureId: string,
  signatures: SignatureType[],
  onSignatureSelect: (selectedSignatureId: string) => any

}

export const SelectSignatureDialog: React.FC<Props> = ({ currentSignatureId, signatures, onSignatureSelect = () => null }) => {
  const { isOpen, toggleDialog, closeDialog } = useDialog()

  const handleSignatureClick = (id: string) => {
    onSignatureSelect(id)
    closeDialog()
  }

  return (
    <Dialog open={isOpen} onOpenChange={toggleDialog}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline">
          <Signature />
          <Text>Change signature</Text>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-4">
        <DialogHeader>
          <DialogTitle>
            Change signature
          </DialogTitle>
          <DialogDescription>
            Click on the signature you&apos;d like to use for this contract
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[50vh] lg:max-h-[80vh] overflow-auto py-2 flex flex-col gap-2">
          {signatures.map(item => (
            <div
              key={item.id}
              onClick={() => handleSignatureClick(item.id)}
            >
              <SignatureItem
                className="cursor-pointer"
                signature={item}
                companyName=""
                userName=""
                isSelected={currentSignatureId === item.id}
              />
            </div>
          ))}
        </div>
        <Button className="px-6 py-3">Cancel</Button>
      </DialogContent>
    </Dialog>
  )
}