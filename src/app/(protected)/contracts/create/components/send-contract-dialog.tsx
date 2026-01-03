"use client"

import { ButtonWithLoading } from "@/components/button-with-loading"
import { FormRow, Input, Label, RequiredFieldMark, Textarea } from "@/components/form-elements"
import { TextCTA } from "@/components/topography/cta"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { DatePicker } from "@/components/ui/date-picker"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { dateUtils } from "@/lib/date-utils"
import { SendContractSchema, T_SendContractPayload } from "@/validators/contract.validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { Send } from "lucide-react"
import { useForm } from "react-hook-form"
import { ExpiryDate } from "./expiry-date"
import { useEffect } from "react"

type Props = {
  receiverEmail: string
}

export const SendContractDialog: React.FC<Props> = ({ receiverEmail }) => {
  const { register, formState, setValue } = useForm<T_SendContractPayload>({
    resolver: zodResolver(SendContractSchema),
    defaultValues: {
      receiverEmail: receiverEmail,
      signingDeadline: undefined,
      optionalMessage: ""
    }
  })

  const handleSigningDeadline = (newDate: Date | null) => {
    setValue(
      "signingDeadline",
      newDate
        ? dateUtils.toUtcEndOfDay(newDate, dateUtils.getUserTimeZone()).toISOString()
        : undefined
    )
  }

  const handleFormSubmit = async () => {

  }

  useEffect(() => {
    setValue("receiverEmail", receiverEmail)
  }, [receiverEmail])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Send />
          Trimite spre semnare
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Trimite contractul
          </DialogTitle>
          <DialogDescription>

          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4">
          {/* <FormRow className="flex-row ">
            <FormRow>
              <Label>Mesaj(optional) <RequiredFieldMark /></Label>
              <Input {...register("receiverName")} placeholder="Dragos Popescu" />
            </FormRow>
            <FormRow>
              <Label>Email Destinatar <RequiredFieldMark /></Label>
              <Input {...register("receiverEmail")} placeholder="dragos@popescu.com" />
            </FormRow>
          </FormRow> */}
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

          <ButtonWithLoading loading={formState.isSubmitting} className="py-4 px-6 w-fit">
            <Send />
            <TextCTA>
              Trimite Contractul
            </TextCTA>
          </ButtonWithLoading>

        </form>
      </DialogContent>
    </Dialog>
  )
}