"use client"

import { T_ViewContract } from "@/actions/post/contracts"
import { GeneratePDFForContract } from "@/actions/post/contracts/pdf"
import { SupabaseStoreFile } from "@/actions/post/storage"
import { api } from "@/app/api/endpoints"
import SignaturePad from "@/app/onboarding/signature/components/signature-pad"
import { ButtonWithLoading } from "@/components/button-with-loading"
import { FormRow, Input, Label } from "@/components/form-elements"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { BUCKETS } from "@/constants/buckets"
import { envs } from "@/constants/envs"
import { useDialog } from "@/hooks/use-dialog"
import { base64ToFile } from "@/lib/utils"
import { useForm } from "react-hook-form"
import { v4 as uuid } from "uuid"

type Props = {
  contract: T_ViewContract
}

export const UserSignatureDialog: React.FC<Props> = ({ contract }) => {
  const { isOpen, toggleModal, openDialog } = useDialog()

  const { formState, setValue, register, handleSubmit, watch } = useForm({
    defaultValues: {
      userFullName: contract.reciverName || "",
      signature: {
        png: "",
        svg: "",
        url: ""
      }
    }
  })

  const isLoading = formState.isSubmitting

  const onOpenChange = () => {
    if (isLoading) return;
    toggleModal()
  }

  const onSigatureChange = ({ svg, png }: { svg: string, png: string }) => {
    setValue("signature", { png, svg, url: "" })
  }

  const handleFormSubmit = handleSubmit(async (values) => {
    if (values.signature.png) {
      const file = await base64ToFile(values.signature.png, "signature" + uuid())
      const { data } = await SupabaseStoreFile({
        bucket: BUCKETS.signatures,
        file,
        filePath: file.name,
      })

      setValue("signature.url", data?.fileUrl!)

      const response = await fetch(api.contract.userSign, {
        method: "POST",
        body: JSON.stringify({
          contractId: contract.id,
          signatureImageUrl: data?.fileUrl,
          receiverName: values.userFullName,
        })
      })

      const result = await response.json()

      if (result.error) {
        return alert(result.error)
      }

      await GeneratePDFForContract({ contractId: contract.id })
    }
  })

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button onClick={openDialog} className="p-4 px-10">Semneaza si trimite</Button>
      </DialogTrigger>
      <DialogContent className="!w-full !max-w-[960px] bg-app">
        <DialogHeader>
          <DialogTitle>Revizuieste si confirma semnatura</DialogTitle>
          <DialogDescription>IP-ul si data vor fi inregistrate. O copie va fi trimisa prin email tuturor partilor.</DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-5">
          <FormRow>
            <Label>Nume complete</Label>
            <Input {...register("userFullName")} className="!text-[18px] font-semibold" />
          </FormRow>
          <FormRow>
            <Label>Semnatura</Label>
            <div className="py-2">
              <SignaturePad
                onChange={onSigatureChange}
                onChangeMode="trimmed"
                onChangeDebounceMs={150}
              />
            </div>
          </FormRow>
        </form>
        <DialogFooter>
          <Button disabled={isLoading} variant="secondary" className="p-4 px-10" onClick={onOpenChange}>Inapoi</Button>
          <ButtonWithLoading loading={isLoading} onClick={handleFormSubmit}>
            Semneaza si trimite
          </ButtonWithLoading>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}