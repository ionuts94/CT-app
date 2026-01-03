"use client"

import { ButtonWithLoading } from "@/components/button-with-loading"
import { FormRow, Input, InvalidInputError, Label, RequiredFieldMark, Textarea } from "@/components/form-elements"
import { RichTextEditor } from "@/components/rich-text-editor"
import { SignatureItem } from "@/components/signature-item"
import { Text } from "@/components/topography"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { ContractStatus, Signature, Template } from "@prisma/client"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDebouncedCallback } from "use-debounce"
import { ContractSentSuccessfully } from "./contract-sent-successfully"
import { Status } from "@/types/api-call"
import { toast } from "sonner"
import CTContract from "@/sdk/contracts"
import { Save } from "lucide-react"
import { SendContractDialog } from "./send-contract-dialog"
import { ExpiryDate } from "./expiry-date"
import { dateUtils } from "@/lib/date-utils"
import { TextCTA } from "@/components/topography/cta"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateContractSchema, T_CreateContractPayload } from "@/validators/contract.validator"


type Props = {
  template?: Template | null,
  signatures?: Signature[] | null
}

export const CreateContractForm: React.FC<Props> = ({ template, signatures }) => {
  const [contractSent, setContractSent] = useState({
    status: "",
    newContractId: ""
  })

  const { formState, register, setValue, watch, handleSubmit, getValues, trigger: runFieldsCheck } = useForm<T_CreateContractPayload>({
    resolver: zodResolver(CreateContractSchema),
    defaultValues: {
      title: "",
      content: template?.content || "" as any,
      ownerSignatureId: signatures?.[0]?.id || "",
      receiverName: "",
      receiverEmail: "",
      contractStatus: ContractStatus.DRAFT,
      expiresAt: undefined,
    }
  })

  const receiverEmail = watch("receiverEmail")

  const debouncedSetContent = useDebouncedCallback(
    (html: string) => {
      setValue("content", html, { shouldDirty: true, shouldValidate: true })
    },
    500
  )

  const handleContractExpiryDate = (newDate: Date | null) => {
    setValue(
      "expiresAt",
      newDate
        ? dateUtils.toUtcEndOfDay(newDate, dateUtils.getUserTimeZone()).toISOString()
        : undefined
    )
  }

  const handleSaveDraft = () => {
    toast.promise(
      async () => {
        const response = await createContract()
        return response
      },
      {
        loading: "Se salveaza contractul",
        success: (successMessage: string) => successMessage,
        error: (error: any) => error.message
      }
    )
  }

  const createContract = async () => {
    const values = getValues()
    const { data, error } = await CTContract.createContract({
      title: values.title,
      content: values.content,
      ownerSignatureId: values.ownerSignatureId,
      contractStatus: values.contractStatus,
      receiverName: values.receiverName,
      receiverEmail: values.receiverEmail,
      expiresAt: values.expiresAt
    })

    if (error) {
      console.log("Failed to create contract. Error: " + error)
      throw new Error("Nu am putut trimite contractul. Eroare: " + error)
    }

    // await CTEmail.sendContractToClient({
    //   contractId: data?.id!,
    //   receiverEmail: values.receiverEmail,
    //   optionalMessage: values.optionalMessage
    // })

    // setContractSent({
    //   status: Status.SUCCESS,
    //   newContractId: data?.id!
    // })
    return "Contractul a fost salvat ca DRAFT"
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
    <form onSubmit={handleSubmit(handleSaveDraft)} className="w-full flex gap-4">
      <div className="w-2/3 flex flex-col gap-4">
        <Card className="p-4">
          <Label htmlFor="template-title">
            Titlu Sablon:
            <Text size="lg" weight="bold">{template?.title}</Text>
          </Label>

          <FormRow>
            <Label>Titlu Contract <RequiredFieldMark /></Label>
            <Input {...register("title")} placeholder="" />
            <InvalidInputError>{formState.errors.title?.message}</InvalidInputError>
          </FormRow>
        </Card>

        <Card className="p-4">
          <FormRow>
            <CardTitle className="mb-2">Editor contract</CardTitle>
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
            <ExpiryDate
              onSelectDate={handleContractExpiryDate}
              ctaText="Contractul are data de expirare"
              additionalInfo={
                <>
                  Contractul este valabil până la sfârșitul zilei selectate.
                  <br />
                  Vei primi un email de reamintire cu 7 zile înainte de expirare.
                </>
              }
            />
          </FormRow>
        </Card>

        <Card className="p-4">
          <CardTitle>Date client</CardTitle>
          <FormRow className="flex-row ">
            <FormRow>
              <Label>Nume Destinatar <RequiredFieldMark /></Label>
              <Input {...register("receiverName")} placeholder="Dragos Popescu" />
              <InvalidInputError>{formState.errors.receiverName?.message}</InvalidInputError>
            </FormRow>
            <FormRow>
              <Label>Email Destinatar <RequiredFieldMark /></Label>
              <Input {...register("receiverEmail")} placeholder="dragos@popescu.com" />
              <InvalidInputError>{formState.errors.receiverEmail?.message}</InvalidInputError>
            </FormRow>
          </FormRow>
          <FormRow className="flex  flex-row justify-end gap-2">
            <ButtonWithLoading type="submit" variant="outline" className="p-4">
              <Save />
              Salveaza ca draft
            </ButtonWithLoading>
            <SendContractDialog receiverEmail={receiverEmail} />
          </FormRow>
        </Card>

      </div>
      <div className="w-1/3">
        {/* <AiTemplateReview /> */}
        ceva
      </div>
    </form>
  )
}