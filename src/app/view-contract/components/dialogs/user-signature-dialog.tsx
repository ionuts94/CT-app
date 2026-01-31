"use client"

import SignaturePad from "@/app/onboarding/signature/components/signature-pad"
import { ButtonWithLoading } from "@/components/button-with-loading"
import { FormRow, Input, Label } from "@/components/form-elements"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { BUCKETS } from "@/constants/buckets"
import { useDialog } from "@/hooks/use-dialog"
import { base64ToFile } from "@/lib/utils"
import CTContract from "@/sdk/contracts"
import CTStorage from "@/sdk/storage"
import { T_ViewContract } from "@/types/services/contracts"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { v4 as uuid } from "uuid"

type Props = {
  contract: T_ViewContract
}

export const UserSignatureDialog: React.FC<Props> = ({ contract }) => {
  const router = useRouter()
  const { isOpen, toggleDialog, openDialog, closeDialog } = useDialog()

  const { formState, setValue, register, handleSubmit } = useForm({
    defaultValues: {
      fullName: contract.receiverName || "",
      signature: {
        png: "",
        svg: "",
        url: "",
      },
    },
  })

  const isLoading = formState.isSubmitting

  const onOpenChange = (val: boolean) => {
    if (isLoading) return;
    toggleDialog(val)
  }

  const onSignatureChange = ({
    svg,
    png,
  }: {
    svg: string
    png: string
  }) => {
    setValue("signature", { png, svg, url: "" })
  }

  const handleFormSubmit = handleSubmit(async (values) => {
    if (!values.signature.png) return

    const file = await base64ToFile(
      values.signature.png,
      `signature-${uuid()}`
    )

    const { data } = await CTStorage.storeFile({
      bucket: BUCKETS.signatures,
      file,
      filePath: file.name,
    })

    if (!data?.fileUrl) {
      return toast.error("Failed to upload signature. Please try again.")
    }

    setValue("signature.url", data.fileUrl)

    const { error } = await CTContract.receiverSignContract({
      contractId: contract.id,
      signatureImageUrl: data.fileUrl,
      receiverName: values.fullName,
    })

    if (error) {
      return toast.error(error)
    }

    CTContract.onContractSigned({ contractId: contract.id })

    toast.success(
      "The contract has been successfully signed. A confirmation email has been sent."
    )

    router.refresh()
    closeDialog()
  })

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button onClick={openDialog} className="py-2 px-10 lg:py-4">
          Sign and submit
        </Button>
      </DialogTrigger>

      <DialogContent className="!w-full !max-w-[960px] bg-app">
        <DialogHeader>
          <DialogTitle>Review and confirm your signature</DialogTitle>
          <DialogDescription>
            Your IP address and the signing date will be recorded. A signed copy
            will be emailed to all parties.
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-5">
          <FormRow>
            <Label>Full name</Label>
            <Input
              {...register("fullName")}
              className="text-lg font-semibold"
            />
          </FormRow>

          <FormRow>
            <Label>Signature</Label>
            <div className="py-2">
              <SignaturePad
                onChange={onSignatureChange}
                onChangeMode="trimmed"
                onChangeDebounceMs={150}
              />
            </div>
          </FormRow>
        </form>

        <DialogFooter>
          <Button
            disabled={isLoading}
            variant="secondary"
            className="px-10 py-4"
            onClick={closeDialog}
          >
            Back
          </Button>

          <ButtonWithLoading
            className="w-full lg:w-fit px-10 py-4"
            loading={isLoading}
            onClick={handleFormSubmit}
          >
            Sign and submit
          </ButtonWithLoading>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}