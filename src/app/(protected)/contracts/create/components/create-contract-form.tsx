"use client"

import { CreateContractRecord } from "@/actions/post/contracts"
import { SendContractEmail } from "@/actions/post/email"
import { ButtonWithLoading } from "@/components/button-with-loading"
import { FormRow, Input, InvalidInputError, Label, RequiredFieldMark, Textarea } from "@/components/form-elements"
import { RichTextEditor } from "@/components/rich-text-editor"
import { SignatureItem } from "@/components/signature-item"
import { Text } from "@/components/topography"
import { TextCTA } from "@/components/topography/cta"
import { Button } from "@/components/ui/button"
import { Card, CardTitle } from "@/components/ui/card"
import { Signature, Template } from "@prisma/client"
import { Check, FileText, Layers } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDebouncedCallback } from "use-debounce"
import { ContractSentSuccessfully } from "./contract-sent-successfully"
import { Status } from "@/types/api-call"
import { toast } from "sonner"
import { LogAudit } from "@/actions/post/audit"
import * as CT from "@/sdk/contracts"

type Props = {
  template?: Template,
  signatures?: Signature[]
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
      signatureId: signatures?.[0].id || "",
      receiverName: "",
      receiverEmail: "",
      optionalMessage: "",
    }
  })

  const receiverEmail = watch("receiverEmail")

  const debouncedSetContent = useDebouncedCallback(
    (html: string) => {
      setValue("content", html, { shouldDirty: true, shouldValidate: true })
    },
    500
  )

  const handleFormSubmit = async (values: any) => {
    console.log(values)

    const { data, error } = await CT.createContract({
      title: values.title,
      content: values.content,
      ownerSignatureId: values.signatureId,
      receiverName: values.receiverName,
      receiverEmail: values.receiverEmail,
      optionalMessage: values.optionalMessage
    })

    if (error) return toast.error(error)

    await SendContractEmail({
      contractId: data?.id!,
      receiverEmail: values.receiverEmail,
      optionalMessage: values.optionalMessage
    })

    setContractSent({
      status: Status.SUCCESS,
      newContractId: data?.id!
    })
  }

  if (contractSent.status === Status.SUCCESS) {
    return (
      <ContractSentSuccessfully
        receiverEmail={receiverEmail}
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
          <CardTitle>Selecteaza Semnatura</CardTitle>
          <FormRow>
            {signatures?.map(signature => (
              <SignatureItem
                key={signature.id}
                signature={signature}
                isSelected
              />
            ))}
          </FormRow>
        </Card>

        <Card className="p-4">
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
        </Card>

      </div>
      <div className="w-1/3">
        {/* <AiTemplateReview /> */}
        ceva
      </div>
    </form>
  )
}