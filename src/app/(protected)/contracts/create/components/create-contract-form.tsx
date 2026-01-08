"use client"

import { ButtonWithLoading } from "@/components/button-with-loading"
import { FormRow, Input, InvalidInputError, Label, RequiredFieldMark, Textarea } from "@/components/form-elements"
import { RichTextEditor } from "@/components/rich-text-editor"
import { SignatureItem } from "@/components/signature-item"
import { Text } from "@/components/topography"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { ContractStatus, Signature } from "@prisma/client"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDebouncedCallback } from "use-debounce"
import { ContractSentSuccessfully } from "./contract-sent-successfully"
import { Status } from "@/types/api-call"
import { toast } from "sonner"
import CTContract from "@/sdk/contracts"
import { Save, Send } from "lucide-react"
import { SendContractDialog } from "./send-contract-dialog"
import { ExpiryDate } from "./expiry-date"
import { dateUtils } from "@/lib/date-utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { ContractSchema, T_ContractPayload, T_SendContractPayload } from "@/validators/contract.validator"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useDialog } from "@/hooks/use-dialog"
import CTEmail from "@/sdk/email"

type Props = {
  data: Data,
  signatures?: Signature[] | null
  isEditing?: boolean
}

type Data = {
  templateTitle?: string
  contractId?: string,
  title?: string,
  content?: string,
  ownerSignatureId?: string,
  receiverName?: string,
  receiverEmail?: string,
  contractStatus?: ContractStatus,
  expiresAt?: string,
  signingDeadline?: string,
  optionalMessage?: string,
}

export const ContractForm: React.FC<Props> = ({ signatures, data, isEditing }) => {
  console.log("data here")
  console.log(data)

  const router = useRouter()
  const { isOpen, closeDialog, openDialog, toggleDialog } = useDialog()

  const [contractSent, setContractSent] = useState({
    status: "",
    newContractId: ""
  })

  const {
    formState,
    register,
    setValue,
    watch,
    handleSubmit,
    getValues,
    reset,
    trigger: runFieldsCheck
  } = useForm<T_ContractPayload>({
    resolver: zodResolver(ContractSchema),
    defaultValues: {
      title: "",
      content: "" as any,
      ownerSignatureId: signatures?.[0]?.id || "",
      receiverName: "",
      receiverEmail: "",
      expiresAt: undefined,
      signingDeadline: undefined,
      optionalMessage: ""
    }
  })

  const values = watch()
  const {
    errors: formErrors,
    isDirty: formHasChanges,
    isSubmitting,
  } = formState

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

  const handleOpenDialog = async () => {
    if (isOpen) {
      return closeDialog()
    }
    const isValid = await runFieldsCheck()
    if (!isValid) return toast.warning("Te rugăm să corectezi câmpurile marcate.")
    openDialog()
  }

  const handleSaveDraft = () => {
    toast.promise(
      async () => {
        const values = getValues()
        if (isEditing) {
          await updateContract(values)
          return "Modificarile au fost salvate"
        } else {
          await createContract(values)
          return "Contractul a fost salvat ca DRAFT"
        }
      },
      {
        loading: "Se salveaza contractul",
        success: (successMessage: string) => {
          router.replace("/contracts")
          return successMessage
        },
        error: (error: any) => error.message
      }
    )
  }

  const createContract = async (values: T_ContractPayload) => {
    const { data, error } = await CTContract.createContract(values)
    if (error) {
      console.log("Failed to create contract. Error: " + error)
      throw new Error("Nu am putut creea contractul. Eroare: " + error)
    }
    return data
  }

  const updateContract = async (values: T_ContractPayload) => {
    console.log("Updating contract")
    console.log(values)

    const { data: updateData, error } = await CTContract.updateContract({
      ...values,
      contractId: data.contractId!
    })
    if (error) {
      console.log("Failed to create contract. Error: " + error)
      throw new Error("Nu am putut trimite contractul. Eroare: " + error)
    }
    return updateData
  }

  const handleSendContract = async (sendValues: T_SendContractPayload) => {
    try {
      console.log("Sending contract")
      console.log(sendValues)

      const response = isEditing
        ? await updateContract({ ...values, ...sendValues })
        : await createContract({ ...values, ...sendValues })

      if (!response) throw new Error("Am intampinat o eroare tehnica. Va rugam sa incercati in cateva minute.")
      await CTEmail.sendContractToClient({
        contractId: response?.id!,
        receiverEmail: response.receiverEmail,
        optionalMessage: response.optionalMessage,
        signingDeadline: response.signingDeadline || undefined
      })

      setContractSent({
        status: Status.SUCCESS,
        newContractId: response.id
      })
      closeDialog()
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    reset({
      title: data.title,
      content: data?.content || "" as any,
      ownerSignatureId: signatures?.[0]?.id || "",
      receiverName: data.receiverName,
      receiverEmail: data.receiverEmail,
      optionalMessage: data.optionalMessage || "",
      signingDeadline: data.signingDeadline,
      expiresAt: data.expiresAt
        ? dateUtils
          .toUtcEndOfDay(
            new Date(data.expiresAt),
            dateUtils.getUserTimeZone()
          )
          .toISOString()
        : undefined
    })

  }, [data])

  if (contractSent.status === Status.SUCCESS) {
    return (
      <ContractSentSuccessfully
        receiverEmail={values.receiverEmail}
        newContractId={contractSent.newContractId}
      />
    )
  }

  return (
    <form onSubmit={handleSubmit(handleSaveDraft)} className="w-full flex gap-4">
      <div className="w-2/3 flex flex-col gap-4">
        <Card className="p-4">
          {data.templateTitle &&
            <Label htmlFor="template-title">
              Titlu Sablon:
              <Text size="lg" weight="bold">{data.templateTitle}</Text>
            </Label>
          }

          <FormRow>
            <Label>Titlu Contract <RequiredFieldMark /></Label>
            <Input {...register("title")} placeholder="" />
            <InvalidInputError>{formErrors.title?.message}</InvalidInputError>
          </FormRow>
        </Card>

        <Card className="p-4">
          <FormRow>
            <CardTitle className="mb-2">Editor contract</CardTitle>
            <InvalidInputError>{ }</InvalidInputError>
            <RichTextEditor
              content={data.content as string || ""}
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
              isOpen={Boolean(data.expiresAt)}
              defaultValue={data.expiresAt ? new Date(data.expiresAt) : undefined}
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
              <InvalidInputError>{formErrors.receiverName?.message}</InvalidInputError>
            </FormRow>
            <FormRow>
              <Label>Email Destinatar <RequiredFieldMark /></Label>
              <Input {...register("receiverEmail")} placeholder="dragos@popescu.com" />
              <InvalidInputError>{formErrors.receiverEmail?.message}</InvalidInputError>
            </FormRow>
          </FormRow>
          <FormRow className="flex  flex-row justify-end gap-2">
            <ButtonWithLoading disabled={!formHasChanges} type="submit" variant="outline" className="p-4">
              <Save />
              Salveaza ca draft
            </ButtonWithLoading>
            <div>
              <Button type="button" className="h-full" onClick={handleOpenDialog}>
                <Send />
                Trimite spre semnare
              </Button>
              <SendContractDialog
                isOpen={isOpen}
                receiverEmail={values.receiverEmail}
                optionalMessage={values.optionalMessage}
                signingDeadline={values.signingDeadline}
                onSendContract={handleSendContract}
                onOpenChange={toggleDialog}
              />
            </div>
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