"use client"

import SignaturePad from "@/app/onboarding/signature/components/signature-pad"
import { ButtonWithLoading } from "@/components/button-with-loading"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { BUCKETS } from "@/constants/buckets"
import { useDialog } from "@/hooks/use-dialog"
import { base64ToFile } from "@/lib/utils"
import CTSignatures from "@/sdk/signatures"
import CTStorage from "@/sdk/storage"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { v4 as uuid } from "uuid"

type Props = {

}

export const CreateNewSignatureDialog: React.FC<Props> = ({ }) => {
  const router = useRouter()
  const { isOpen, closeDialog, toggleDialog } = useDialog()
  const [uploadingSignature, setUploadingSignature] = useState(false)
  const [pngSignature, setPngSignature] = useState("")

  const onSignatureChange = (signature: { png: string }) => {
    setPngSignature(signature.png)
  }

  const handleSubmitSignature = async () => {
    try {
      setUploadingSignature(true)

      if (pngSignature) {
        const file = await base64ToFile(pngSignature, "signature-" + uuid())

        const { data } = await CTStorage.storeFile({
          bucket: BUCKETS.signatures,
          file,
          filePath: file.name,
        })

        if (!data.fileUrl) throw new Error("Failed to store signature. Please try again in a few minutes.")

        const { error } = await CTSignatures.create({ fileUrl: data.fileUrl })

        if (error) throw new Error(error)

        router.refresh()
        closeDialog()
        return toast.success("Signature created successfully.")
      }

      throw new Error("We're facing technical issues. Please contact support.")
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setUploadingSignature(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={toggleDialog}>
      <DialogTrigger asChild>
        <Button className="h-fit">Create new signature</Button>
      </DialogTrigger>
      <DialogContent className="!max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Create new signature</DialogTitle>
        </DialogHeader>
        <SignaturePad
          onChange={onSignatureChange}
          onChangeMode="trimmed"
          onChangeDebounceMs={150}
        />
        <ButtonWithLoading
          onClick={handleSubmitSignature}
          loading={uploadingSignature}
          disabled={uploadingSignature}
        >
          Submit signature
        </ButtonWithLoading>
      </DialogContent>
    </Dialog>
  )
}