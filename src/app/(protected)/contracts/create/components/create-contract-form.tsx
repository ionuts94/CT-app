"use client"

import { ButtonWithLoading } from "@/components/button-with-loading"
import { FormRow, Input, InvalidInputError, Label, RequiredFieldMark, Textarea } from "@/components/form-elements"
import { RichTextEditor } from "@/components/rich-text-editor"
import { SignatureItem } from "@/components/signature-item"
import { Text } from "@/components/topography"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { ContractStatus, Signature, Template } from "@prisma/client"
import { useEffect, useState } from "react"
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
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateContractSchema, T_CreateContractPayload } from "@/validators/contract.validator"
import { useRouter } from "next/navigation"

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
}

export const ContractForm: React.FC<Props> = ({ signatures, data, isEditing }) => {
  const router = useRouter()

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
  } = useForm<T_CreateContractPayload>({
    resolver: zodResolver(CreateContractSchema),
    defaultValues: {
      title: "",
      content: "" as any,
      ownerSignatureId: signatures?.[0]?.id || "",
      receiverName: "",
      receiverEmail: "",
      contractStatus: ContractStatus.DRAFT,
      expiresAt: undefined,
    }
  })

  const { receiverEmail } = watch()
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

  const handleSaveDraft = () => {
    toast.promise(
      async () => {
        console.log("Hereee")
        let response = ""
        if (isEditing) {
          response = await updateContract()
        } else {
          response = await createContract()
        }

        console.log("Got responseee")
        router.replace("/contracts")
        return response
      },
      {
        loading: "Se salveaza contractul",
        success: (successMessage: string) => successMessage,
        error: (error: any) => error.message
      }
    )
  }

  console.log(formErrors)

  const createContract = async () => {
    console.log("inside create contract func")
    const values = getValues()
    const { data, error } = await CTContract.createContract(values)

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

  const updateContract = async () => {
    const values = getValues()
    const { data, error } = await CTContract.createContract(values)
    if (error) {
      console.log("Failed to create contract. Error: " + error)
      throw new Error("Nu am putut trimite contractul. Eroare: " + error)
    }
    return "Modificarile au fost salvate"
  }

  useEffect(() => {
    reset({
      title: data.title,
      content: data?.content || "" as any,
      ownerSignatureId: signatures?.[0]?.id || "",
      receiverName: data.receiverName,
      receiverEmail: data.receiverEmail,
      contractStatus: data.contractStatus || ContractStatus.DRAFT,
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
        receiverEmail={receiverEmail}
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