"use client"

import { ButtonWithLoading } from "@/components/button-with-loading"
import { FormRow, Input, Label, RequiredFieldMark, Textarea } from "@/components/form-elements"
import { TextCTA } from "@/components/topography/cta"
import { CardDescription, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { dateUtils } from "@/lib/date-utils"
import { SendContractSchema, T_ContractPayload, T_SendContractPayload } from "@/validators/contract.validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { Send } from "lucide-react"
import { useForm } from "react-hook-form"
import { ExpiryDate } from "./expiry-date"
import { useEffect } from "react"
import { Contract } from "@prisma/client"
import CTEmail from "@/sdk/email"

type Props = {
  isOpen: boolean,
  contractData: T_ContractPayload,
  onOpenChange?: (newValue: boolean) => any,
  actionBeforeSend: (data: T_ContractPayload) => Promise<Contract | undefined>,
  actionAfterSend: (data: Contract) => any,
}

export const SendContractDialog: React.FC<Props> = ({
  isOpen,
  contractData,
  onOpenChange = () => null,
  actionBeforeSend = () => null,
  actionAfterSend = () => null
}) => {
  const { register, formState, setValue, handleSubmit, watch } = useForm<T_SendContractPayload>({
    resolver: zodResolver(SendContractSchema),
    defaultValues: {
      receiverEmail: contractData.receiverEmail,
      signingDeadline: undefined,
      optionalMessage: ""
    }
  })

  const sendValues = watch()

  const handleSigningDeadline = (newDate: Date | null) => {
    setValue(
      "signingDeadline",
      newDate
        ? dateUtils.toUtcEndOfDay(newDate, dateUtils.getUserTimeZone()).toISOString()
        : undefined
    )
  }

  const handleFormSubmit = async () => {
    const response = await actionBeforeSend({
      ...contractData,
      ...sendValues
    })
    if (!response) throw new Error("Nu putem trimite contractul. Va rugam incercati din nou in cateva minute.")
    await CTEmail.sendContractToClient({
      contractId: response?.id!,
      receiverEmail: response.receiverEmail,
      optionalMessage: response.optionalMessage
    })
    onOpenChange(false)
    actionAfterSend(response)
  }

  useEffect(() => {
    setValue("receiverEmail", contractData.receiverEmail)
  }, [contractData])

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Trimite contractul
          </DialogTitle>
          <DialogDescription>

          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">

          <FormRow>
            <Label>Email Destinatar <RequiredFieldMark /></Label>
            <Input {...register("receiverEmail")} placeholder="dragos@popescu.com" />
          </FormRow>
          <FormRow>
            <Label>Mesaj optional</Label>
            <Textarea {...register("optionalMessage")} />
          </FormRow>
          <FormRow>
            <CardTitle>Termen de semnare</CardTitle>
            <CardDescription className="max-w-[600px]">
              Contractul poate fi semnat oricând, implicit.
            </CardDescription>

            <ExpiryDate
              onSelectDate={handleSigningDeadline}
              ctaText="Setează un termen de semnare"
              additionalInfo="Vom trimite un email de reamintire cu 48 de ore înainte de acest termen."
            />

          </FormRow>

          <ButtonWithLoading
            type="button"
            loading={formState.isSubmitting}
            className="py-4 px-6 w-fit"
            onClick={handleSubmit(handleFormSubmit)}
          >
            <Send />
            <TextCTA>Trimite Contractul</TextCTA>
          </ButtonWithLoading>

        </div>
      </DialogContent>
    </Dialog>
  )
}