"use client"

import { ButtonWithLoading } from "@/components/button-with-loading"
import { FormRow, Input, InvalidInputError, Label, RequiredFieldMark, Textarea } from "@/components/form-elements"
import { RichTextEditor } from "@/components/rich-text-editor"
import { SignatureItem } from "@/components/signature-item"
import { Text } from "@/components/topography"
import { TextCTA } from "@/components/topography/cta"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Signature, Template } from "@prisma/client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDebouncedCallback } from "use-debounce"
import { ContractSentSuccessfully } from "./contract-sent-successfully"
import { Status } from "@/types/api-call"
import { toast } from "sonner"
import CTContract from "@/sdk/contracts"
import CTEmail from "@/sdk/email"
import { Save } from "lucide-react"
import { SendContractDialog } from "./send-contract-dialog"
import { FormLabel } from "@/components/ui/form"
import { DatePicker } from "@/components/ui/date-picker"


type Props = {
  template?: Template | null,
  signatures?: Signature[] | null
}

export const CreateContractForm: React.FC<Props> = ({ template, signatures }) => {
  const [contractSent, setContractSent] = useState({
    status: "",
    newContractId: ""
  })

  const { formState, register, setValue, watch, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      content: template?.content || "",
      signatureId: signatures?.[0]?.id || "",

    }
  })

  // const receiverEmail = watch("receiverEmail")

  const debouncedSetContent = useDebouncedCallback(
    (html: string) => {
      setValue("content", html, { shouldDirty: true, shouldValidate: true })
    },
    500
  )

  const handleFormSubmit = (values: any) => {
    toast.promise(
      async () => {
        const { data, error } = await CTContract.createContract({
          title: values.title,
          content: values.content,
          ownerSignatureId: values.signatureId,
        })

        if (error) throw new Error("Nu am putut trimite contractul. Eroare: " + error)

        // await CTEmail.sendContractToClient({
        //   contractId: data?.id!,
        //   receiverEmail: values.receiverEmail,
        //   optionalMessage: values.optionalMessage
        // })

        // setContractSent({
        //   status: Status.SUCCESS,
        //   newContractId: data?.id!
        // })
        return "Contractul a fost trimis"
      },
      {
        loading: "Se trimite contractul",
        success: (successMessage: string) => successMessage,
        error: (error: any) => error.message
      }
    )
  }

  if (contractSent.status === Status.SUCCESS) {
    return (
      <ContractSentSuccessfully
        receiverEmail={""}
        newContractId={contractSent.newContractId}
      />
    )
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full flex gap-4">
      <div className="w-2/3 flex flex-col gap-4">
        <Card className="p-4">
          <Label htmlFor="template-title">
            Titlu Sablon:
            <Text size="lg" weight="bold">{template?.title}</Text>
          </Label>

          <FormRow>
            <Label>Titlu Contract <RequiredFieldMark /></Label>
            <Input {...register("title")} placeholder="" />
          </FormRow>
        </Card>

        <Card className="p-4">
          <FormRow>
            <InvalidInputError>{ }</InvalidInputError>
            <RichTextEditor
              content={template?.content as string || ""}
              onChange={(htmlString) => debouncedSetContent(htmlString)}
              showAiHelper={false}
            />
          </FormRow>
        </Card>

        <Card className="p-4">
          <CardTitle>Selecteaza semnatura</CardTitle>
          <FormRow>
            {signatures?.map(signature => (
              <SignatureItem
                key={signature.id}
                signature={signature}
                isSelected
              />
            ))}
          </FormRow>
          <FormRow>
            <CardTitle>Valabilitatea contractului</CardTitle>
            <CardDescription className="max-w-[600px]">
              Contractul nu are, implicit, o dată de expirare.
              Bifați opțiunea de mai jos pentru a seta o dată.
            </CardDescription>
            <div className="flex gap-2 items-center">
              <input className="size-4" type="checkbox" />
              <Label>Contractul are data de expirare</Label>
            </div>
            <DatePicker />
            <CardDescription>Vei primi un email de reamintire cu 7 zile înainte de expirare.</CardDescription>
          </FormRow>
          <FormRow className="flex  flex-row justify-end gap-2">
            <ButtonWithLoading variant="outline" className="p-4">
              <Save />
              Salveaza ca draft
            </ButtonWithLoading>
            <SendContractDialog />
          </FormRow>
        </Card>

        {/* <Card className="p-4">
          <CardTitle>Trimite Contractul</CardTitle>
          <FormRow className="flex-row ">
            <FormRow>
              <Label>Nume Destinatar <RequiredFieldMark /></Label>
              <Input {...register("receiverName")} placeholder="Dragos Popescu" />
            </FormRow>
            <FormRow>
              <Label>Email Destinatar <RequiredFieldMark /></Label>
              <Input {...register("receiverEmail")} placeholder="dragos@popescu.com" />
            </FormRow>
          </FormRow>
          <FormRow>
            <Label>Mesaj optional</Label>
            <Textarea {...register("optionalMessage")} />
          </FormRow>

          <ButtonWithLoading loading={formState.isSubmitting} className="py-4 px-6 w-fit">
            <TextCTA>
              Trimite Contractul
            </TextCTA>
          </ButtonWithLoading>
        </Card> */}

      </div>
      <div className="w-1/3">
        {/* <AiTemplateReview /> */}
        ceva
      </div>
    </form>
  )
}