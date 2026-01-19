"use client"

import { ButtonWithLoading } from "@/components/button-with-loading"
import { FormRow, Input, InvalidInputError, Label, RequiredFieldMark, Textarea } from "@/components/form-elements"
import { TextCTA } from "@/components/topography/cta"
import { CardDescription, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { dateUtils } from "@/lib/date-utils"
import { SendContractSchema, T_SendContractPayload } from "@/validators/contract.validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { Send } from "lucide-react"
import { useForm } from "react-hook-form"
import { ExpiryDate } from "./expiry-date"
import { useEffect } from "react"
import { toast } from "sonner"

type Props = {
  isOpen: boolean,
  receiverEmail?: string,
  optionalMessage?: string
  signingDeadline?: string
  onSendContract: (values: T_SendContractPayload) => any,
  onOpenChange?: (newValue: boolean) => any,
}

export const SendContractDialog: React.FC<Props> = ({
  isOpen,
  receiverEmail,
  optionalMessage,
  signingDeadline,
  onOpenChange = () => null,
  onSendContract = () => null,
}) => {
  const { register, formState, setValue, handleSubmit, watch } = useForm<T_SendContractPayload>({
    resolver: zodResolver(SendContractSchema),
    defaultValues: {
      receiverEmail: receiverEmail,
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
    if (!sendValues.receiverEmail) {
      return toast.warning("Recipient email is required")
    }
    await onSendContract(sendValues)
  }

  useEffect(() => {
    setValue("receiverEmail", receiverEmail || "")
    setValue("signingDeadline", signingDeadline)
    setValue("optionalMessage", optionalMessage)
  }, [receiverEmail, signingDeadline, optionalMessage])

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Send contract
          </DialogTitle>
          <DialogDescription>
            Review the details below before sending the contract for signing.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <FormRow>
            <Label>Recipient email <RequiredFieldMark /></Label>
            <Input {...register("receiverEmail")} placeholder="john.smith@email.com" />
            <InvalidInputError>{formState.errors.receiverEmail?.message}</InvalidInputError>
          </FormRow>

          <FormRow>
            <Label>Optional message</Label>
            <Textarea {...register("optionalMessage")} />
          </FormRow>

          <FormRow>
            <CardTitle>Signing deadline</CardTitle>
            <CardDescription className="max-w-[600px]">
              By default, the contract can be signed at any time.
            </CardDescription>

            <ExpiryDate
              isOpen={Boolean(signingDeadline)}
              defaultValue={signingDeadline ? new Date(signingDeadline) : undefined}
              onSelectDate={handleSigningDeadline}
              ctaText="Set a signing deadline"
              additionalInfo="We&apos;ll send a reminder email 48 hours before this deadline."
            />
          </FormRow>

          <ButtonWithLoading
            type="button"
            loading={formState.isSubmitting}
            className="py-4 px-6 w-fit"
            onClick={handleSubmit(handleFormSubmit)}
          >
            <Send />
            <TextCTA>Send contract</TextCTA>
          </ButtonWithLoading>
        </div>
      </DialogContent>
    </Dialog>
  )
}
