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
    if (!isValid) return toast.warning("Please correct the highlighted fields.")
    openDialog()
  }

  const handleSaveDraft = () => {
    toast.promise(
      async () => {
        const values = getValues()
        if (isEditing) {
          await updateContract(values)
          return "Changes have been saved"
        } else {
          await createContract(values)
          return "Contract saved as draft"
        }
      },
      {
        loading: "Saving contract…",
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
      throw new Error("We couldn’t create the contract. Error: " + error)
    }
    return data
  }

  const updateContract = async (values: T_ContractPayload) => {
    const { data: updateData, error } = await CTContract.updateContract({
      ...values,
      contractId: data.contractId!
    })
    if (error) {
      throw new Error("We couldn’t update the contract. Error: " + error)
    }
    return updateData
  }

  const handleSendContract = async (sendValues: T_SendContractPayload) => {
    try {
      const response = isEditing
        ? await updateContract({ ...values, ...sendValues })
        : await createContract({ ...values, ...sendValues })

      if (!response) {
        throw new Error("We encountered a technical issue. Please try again in a few minutes.")
      }

      await CTEmail.sendContractToClient({
        contractId: response.id!,
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
              Template title:
              <Text size="lg" weight="bold">{data.templateTitle}</Text>
            </Label>
          }

          <FormRow>
            <Label>Contract title <RequiredFieldMark /></Label>
            <Input {...register("title")} />
            <InvalidInputError>{formErrors.title?.message}</InvalidInputError>
          </FormRow>
        </Card>

        <Card className="p-4">
          <FormRow>
            <CardTitle>Contract editor</CardTitle>
            <InvalidInputError>{ }</InvalidInputError>
            <RichTextEditor
              content={data.content as string || ""}
              onChange={(htmlString) => debouncedSetContent(htmlString)}
              showAiHelper={false}
            />
          </FormRow>
        </Card>

        <Card className="p-4">
          <CardTitle>Select signature</CardTitle>
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
            <CardTitle>Contract validity</CardTitle>
            <CardDescription className="max-w-[600px]">
              By default, the contract does not have an expiry date.
              Enable the option below to set one.
            </CardDescription>
            <ExpiryDate
              isOpen={Boolean(data.expiresAt)}
              defaultValue={data.expiresAt ? new Date(data.expiresAt) : undefined}
              onSelectDate={handleContractExpiryDate}
              ctaText="This contract has an expiry date"
              additionalInfo={
                <>
                  The contract will remain valid until the end of the selected day.
                  <br />
                  You will receive an email reminder 7 days before expiry.
                </>
              }
            />
          </FormRow>
        </Card>

        <Card className="p-4">
          <CardTitle>Recipient details</CardTitle>
          <FormRow className="flex-row">
            <FormRow>
              <Label>Recipient name <RequiredFieldMark /></Label>
              <Input {...register("receiverName")} placeholder="John Smith" />
              <InvalidInputError>{formErrors.receiverName?.message}</InvalidInputError>
            </FormRow>
            <FormRow>
              <Label>Recipient email <RequiredFieldMark /></Label>
              <Input {...register("receiverEmail")} placeholder="john.smith@email.com" />
              <InvalidInputError>{formErrors.receiverEmail?.message}</InvalidInputError>
            </FormRow>
          </FormRow>

          <FormRow className="flex flex-row justify-end gap-2">
            <ButtonWithLoading disabled={!formHasChanges} type="submit" variant="outline" className="p-4">
              <Save />
              Save as draft
            </ButtonWithLoading>
            <div>
              <Button type="button" className="h-full" onClick={handleOpenDialog}>
                <Send />
                Send for signing
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
        {/* right column */}
      </div>
    </form>
  )
}